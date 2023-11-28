//Imports
var models = require("../models");
var asyncLib = require("async");
var { Op } = require('sequelize')

//Constants

//Routes
module.exports = {
    createMessage: async(req,res)=> {
        let text = req.body.text;
        let grouped = req.query.grouped;
        let receiverId = parseInt(req.params.receiverId);
        let senderId = parseInt(req.params.senderId);
        let conversationId = parseInt(req.params.conversationId);
        let liaison_check_vu;

        await models.Liaison.findOne({
            where: { 
                conversationId: conversationId,
                [Op.and]: { userId: receiverId } 
            }
        }).then((res)=> {
            if(res) {
                let tmp = JSON.stringify(res,null,2);
                this.liaison_check_vu = JSON.parse(tmp);
            }
        }).catch((err)=> {
            console.log(err);
        })

        models.Message.create({
            text:text,
            receiverId:(grouped == "true")? 0 : receiverId,
            vu: (this.liaison_check_vu.vu == true)? true : false,
            senderId:senderId,
            conversationId:conversationId,
            groupId:(grouped == "true")? receiverId : 0
        }).then((newMessage)=> {
            if(newMessage) {
                // console.log(newMessage);
                res.status(200).json(newMessage);
            }
               
            else
                res.status(500).json({
                    "error":"impossible to create message"
                });
        }).catch((err)=> {
            console.log(err);
            return res.status(500).json({ "error": "cannot add message" });
        });
    },
    getMessage: (req,res)=> {
        let messageId = parseInt(req.params.messageId);
        models.Message.findOne({
            where: { id:messageId }
        }).then((messageFound)=> {
            if(messageFound)
                res.status(200).json(messageFound);
            else
                res.status(404).json({
                    "error":"enable to verify message"
                });
        }).catch((err)=> {
            console.log(err);
            return res.status(500).json({ "error": "cannot get message" });
        });
    },
    getAllMessages: (req,res)=> {
        let conversationId = parseInt(req.params.conversationId);
        models.Message.findAll({
            // include: [{
            //     model: models.User,
            //     as: "sender"
            // }],
            where: { conversationId: conversationId}
        }).then((messagesFound)=> {
            if(messagesFound)
                res.status(200).json(messagesFound);
            else
                res.status(404).json({
                    "error":"enable to verify conversation"
                });
        }).catch((err)=> {
            console.log(err);
            return res.status(500).json({ "error": "cannot get messages" });
        });

    },
    updateMessage: (req,res)=> {

    },
    deleteMessage: (req,res)=> {
        let messageId = parseInt(req.params.messsageId);
        models.Message.destroy({
            where: { id : messageId }
        }).then((count)=> {
            if(count)
                res.status(201).send("message deleted successfully");
            else
                res.status(404).json({
                    "error": "no message"
                });
        }).catch((err)=> {
            res.status(500).json({
                "error": "cannot delete message"
            });
        });
    },
    updateMessageFunction:async(messageId)=> {
        await models.Message.findOne({
            where: { id: messageId }
        }).then((messageFound)=> {
            if(messageFound) {
                messageFound.update({
                    vu: true 
                }).then((message_updated)=> {
                //    console.log(message_updated);
                }).catch((err)=> {
                    console.log(err);
                });
            }
        }).catch((err)=> {
            console.log(err);
        })
    },
    updateStatusVu: (req,res)=> {
        let conversationId = parseInt(req.params.conversationId);
        let userId = parseInt(req.params.userId);

        models.Message.findAll({
            attributes: ['id','receiverId','vu','conversationId'],
            where: { 
                conversationId: conversationId,
                [Op.and]: { receiverId: userId }
             }
        }).then(async(messageFound)=> {
            if(messageFound) {
                let tmp_messages = JSON.stringify(messageFound);
                let messages = JSON.parse(tmp_messages,null,2);
                for(let i=0;i<messages.length;i++) {
                    await module.exports.updateMessageFunction(messages[i].id);
                }
                res.status(201).json("updated successfully");
            }
        }).catch((err)=> {
            res.status(500).json("cannot update")
        });
    }
}