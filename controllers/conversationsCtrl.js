//Imports
const bodyParser = require("body-parser");
var models = require("../models");
const { Op } = require('sequelize');

//Constants

//Routes
module.exports = {
    createConversation: (req,res)=> {
        let grouped = req.query.grouped;
        let receiverId = parseInt(req.params.receiverId);
        let senderId = parseInt(req.params.senderId);

        if(grouped == "false") {
            models.Conversation.create({
                type: "private"
            }).then((newConversation)=> {
                if(newConversation) {
                    models.Liaison.create({
                        vu: true,
                        userId: senderId,
                        conversationId: newConversation.id
                    }).then((newLiaison)=> {
                        if(newLiaison) {
                            models.Liaison.create({
                                vu: false,
                                userId: receiverId,
                                conversationId: newConversation.id
                            }).then((newLiaisonReceive)=> {
                                if(newLiaisonReceive)
                                    res.status(201).json(newConversation);
                                else
                                    res.status(500).json({
                                        "error":"impossible to create liaison between user and conversation"
                                    });
                            });
                        } 
                        else 
                            res.status(500).json({
                                "error":"impossible to create liaison between user and conversation"
                            });
                    });
                }    
                else
                    res.status(500).json({
                        "error":"impossible to create conversation"
                    });
            }).catch((err)=> {
                console.log(err);
                return res.status(500).json({ "error": "cannot create conversation" });
            });
        } else {
            models.Conversation.create({
                type: "grouped"
            }).then((newConversation)=> {
                if(newConversation) 
                    res.status(201).json(newConversation);
                else
                    res.status(500).json({
                        "error":"impossible to create conversation"
                    });
            }).catch((err)=> {
                return res.status(500).json({ "error": "cannot create conversation" });
            });
        }
    },
    getConversation: (req,res)=> {

    }, 
    getAllConversation: async(userId)=> {
        let convId = [];
        await models.Liaison.findAll({
            include: [
                {
                    model: models.Conversation,
                    as: 'conversation',
                }
            ],
            where: { userId : userId }
        }).then((conversationFound)=> {
            if(conversationFound) {
                let tmp = JSON.stringify(conversationFound,null,2);//pour mettre en forme la vue de l'objet
                let conversations = JSON.parse(tmp);
                for(let i=0;i<conversations.length;i++)
                    convId.push(conversations[i].conversationId);
            } 
        }).catch((err)=> {
            console.log(err);
        })
        return convId;
    },
    getUsersWithConversation: async(req,res)=> {
        let userId = parseInt(req.params.userId);
        let conversationId = [];
        let data = [];

        await module.exports.getAllConversation(userId).then((res)=> {
            conversationId=res;
        });
        for(let i=0; i<conversationId.length; i++) {
            await models.Liaison.findOne({
                include: [{
                    model: models.User,
                    as: "user"
                }],
                where: {
                    userId: {
                        [Op.ne]: userId 
                    },
                    [Op.and]: { conversationId : parseInt(conversationId[i]) }
                }
            }).then((liaisonFound)=> {
                if(liaisonFound) {
                    let tmp = JSON.stringify(liaisonFound,null,2)
                    let tmp1 = JSON.parse(tmp);
                    data.push(tmp1);
                }
            }).catch((err)=> {
                console.log(err);
            });
        }
        res.status(201).json(data);
    },
    updateFunction:async(liaisonId)=> {
        await models.Liaison.findOne({
            where: { id: liaisonId }
        }).then((liaisonFound)=> {
            if(liaisonFound) {
                liaisonFound.update({
                    vu: false 
                }).then((liaison_updated)=> {
                //    console.log(liaison_updated);
                }).catch((err)=> {
                    console.log(err);
                });
            }
        }).catch((err)=> {
            console.log(err);
        })
    },
    updateLiaison: (req,res)=> {
        let conversationId = parseInt(req.params.conversationId);
        let userId = parseInt(req.params.userId);
        let vu = req.body.vu;

        models.Liaison.findOne({
            where: { 
                conversationId: conversationId,
                [Op.and]: { userId: userId } 
            }
        }).then((liaisonFound)=> {
            if(liaisonFound) {
                liaisonFound.update({
                    vu: vu 
                }).then((liaison_updated)=> {
                    res.status(201).json(liaison_updated);
                }).catch((err)=> {
                    console.log(err);
                    res.status(500).json({
                        "error": "cannot update liaison"
                    });
                });
            }
        }).catch((err)=> {
            res.status(500).json({
                "error": "cannot update liaison or liaison not found"
            });
        })
    },
    updateAllLiaisonUserLogout: (req,res)=> {
        let userId = parseInt(req.params.userId);
        models.Liaison.findAll({
            attributes:['id','userId'],
            where: { userId: userId }
        }).then(async(liaisonFound)=> {
            if(liaisonFound) {
                let tmp_liaison = JSON.stringify(liaisonFound,null,2);
                let tmp = JSON.parse(tmp_liaison);
                // console.log(tmp);
                for(let i=0;i<tmp.length;i++) {
                    await module.exports.updateFunction(tmp[i].id);
                }
                res.status(201).json("liaison update successfully")
            }
        }).catch((err)=> {
            res.status(500).json({
                "error": "cannot update liaison or liaison not found"
            });
        })
    }
}