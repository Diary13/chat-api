//Imports
var models = require("../models");
var asyncLib = require("async");
var bcrypt = require("bcrypt");
var fs = require("fs");
var jwtUtils=require("../utils/jwt.utils");
const { Op } = require('sequelize');

//Constants

//routes
module.exports = {
    //registre new user
    register: (req,res,next)=> {
        //params
        let username = req.body.username;
        let mail = req.body.mail;
        let password = req.body.password;
        let image = "";
        let status = "inactif";
        let isAdmin = req.body.isAdmin;

        if(req.file) {
            fs.renameSync("uploads/images/" + req.file.filename,"uploads/images/"+req.file.originalname);
            image = "uploads/images/"+req.file.originalname;
        }

        if(username == "" || mail == "" || password == "" || isAdmin == null) {
            return res.status(400).json({
                "error":"missing parameters"
            });
        }
        if(username.length>40 || username.length<2) {
            return res.status(400).json({
                "error": "username must be length (2-40)"
            })
        }
        asyncLib.waterfall([
            (next)=> {
                models.User.findOne({
                    attributes: ["username","mail"],
                    where: {
                        [Op.or]: [{
                            username:username
                        },{
                            mail:mail
                        }]
                    }
                }).then((userFound)=> {
                    next(null,userFound);
                }).catch((err)=> {
                    console.log(err);
                    res.status(500).json({
                        "error":"enable to verify user"
                    })
                });
            },(userFound,next)=> {
                if(!userFound) {
                    bcrypt.hash(password,5,(err, bcryptedPassword)=> {
                        next(null,userFound,bcryptedPassword);
                    });
                } else {
                    return res.status(409).json({ 
                        "error": "user already exist" 
                    });
                }
            },(userFound,bcryptedPassword,next)=> {
                models.User.create({
                    username:username,
                    mail:mail,
                    password:bcryptedPassword,
                    image:image,
                    status:status,
                    lastLog:Date.now(),
                    isAdmin:isAdmin
                }).then((newUser)=> {
                    next(newUser);
                }).catch((err)=> {
                    console.log(err);
                    return res.status(500).json({ "error": "cannot add user" });
                });
            }
        ], (newUser)=> {
            if(newUser) {
                return res.status(201).json({ 
                    "userId": newUser.id
                });
            } else {
                return res.status(500).json({ 
                    "error": "cannot add user" 
                });
            }
        })
    },
    //take one user
    getUser: (req,res)=> {
        let userId = parseInt(req.params.userId);
        models.User.findOne({
            where: { id:userId }
        }).then((userFound)=> {
            if(userFound) {
                res.status(201).json(userFound);
            } else {
                res.status(404).json({
                    "error": "user not found" 
                })
            }
        }).catch((err)=> {
            res.status(500).json({
                "error": "cannot fetch user"
            });
        })
    },
    //take all users
    getAllUser: (req,res)=> {
        models.User.findAll().then((userFound)=> {
            if(userFound) {
                res.status(201).json(userFound);
            } else {
                res.status(404).json({
                    "error": "user not found" 
                })
            }
        }).catch((err)=> {
            res.status(500).json({
                "error": "cannot fetch user"
            });
        })
    },
    //update the user profile
    updateUserProfile: (req,res,next)=> {
        //params
        let userId = parseInt(req.params.userId);
        let username = req.body.username;
        let mail = req.body.mail;
        let password = req.body.password;
        let image = "";
        let isAdmin = req.body.isAdmin;

        if(req.file) {
            fs.renameSync("uploads/images/" + req.file.filename,"uploads/image/" + req.file.originalname);
            image="uploads/images/" + req.file.originalname;
        }

        if(username) {
            if(username.length > 40 || username.length < 2) {
                return res.status(400).json({
                    "error": "username must be length (2-40)"
                })
            }
        }
        if(password) {
            bcrypt.hash(password,5,function(err, bcryptedPassword) {
                password=bcryptedPassword;
            });
        }
        asyncLib.waterfall([
            (next)=> {
                models.User.findOne({
                    where: {id: userId}
                }).then((userFound)=> {
                    next(null,userFound);
                }).catch((err)=> {
                    console.log(err);
                    return res.status(500).json({
                        "error": "enable to verify user"
                    });
                });
            },(userFound,next)=> {
                if(userFound) {
                    if(username || mail) {
                        models.User.findOne({
                            attributes: ["username","mail"],
                            where: { 
                                [Op.or]: [{
                                    username:username
                                },{
                                    mail:mail
                                }]
                            }
                        }).then((userOnDbFound)=> {
                            next(null, userOnDbFound,userFound);
                        }).catch((err)=> {
                            return res.status(500).json({ 
                                "error": "enable to verify user" 
                            });
                        });     
                    } else {
                        next(null,null,userFound);
                    }
                } else {
                    return res.status(404).json({
                        "error": "user not found"
                    })
                }
            },(userOnDbFound,userFound,next)=> {
                if(!userOnDbFound) {
                    userFound.update({
                        username: (username? username:userFound.username),
                        mail: (mail? mail:userFound.mail),
                        password: (password? password:userFound.password),
                        image: (image? image:userFound.image),
                        status: userFound.status,
                        isAdmin: (isAdmin? isAdmin: userFound.isAdmin)
                    }).then(()=> {                    
                        next(userFound);
                    }).catch((err)=> {
                        return res.status(500).json({
                            "error": "cannot update user"
                        });
                    })
                } else {
                    return res.status(409).json({ 
                        "error": "user already exist" 
                    });
                }
            }
        ],(userFound)=> {
            if(userFound)
                return res.status(201).json(userFound);
            else
                return res.status(500).json({
                    "error": "cannot update user profile"
                });
        });
    },
    //delete user
    deleteUser: (req,res)=> {
        let userId = parseInt(req.params.userId);
        
        models.User.destroy({
            where: { id:userId }
        }).then(count => {
            if(!count)
                res.status(404).json({
                    "error":"no user"
                });
            res.status(204).send("user deleted");
        }).catch(err => {
            res.status(500).json({
                "error": "cannot deleted"
            });
        });
    },
    
    login: (req,res)=> {
        let mail = req.body.mail;
        let password = req.body.password; 

        if(mail == "" || password == "") {
            return res.status(400).json({ "error": "missing parameters" });
        }
        //#region login_with_waterFall
        asyncLib.waterfall([
            (next)=> {
                models.User.findOne({
                    where: { mail: mail }
                }).then((userFound)=>{
                    next(null,userFound);
                }).catch((err)=>{
                    console.log(err);
                    return res.status(500).json({
                       "error": "enable to verify user"
                    });
                });
            },
            (userFound,next)=> {
                if(userFound) {
                    bcrypt.compare(password, userFound.password, (errByCrypt, resByCrypt)=> {
                        next(null,userFound,resByCrypt);
                    });
                } else {
                    return res.status(404).json({
                        "error": "user not exist in DB"
                    }); 
                }
            },
            (userFound,resByCrypt,next)=> {
                if(resByCrypt) {
                    next(userFound);
                } else {
                    return res.status(403).json({
                        "error":"invalid password"
                    });
                }
            } 
        ],(userFound)=> {
            if(userFound) {
                let token= "Bearer" + jwtUtils.generateTokenForUser(userFound);
                userFound.update({
                    lastLog: Date.now(),
                    status: "actif"
                }).then(()=> {
                    return res.status(200).json({
                                "userId": userFound.id,
                                "username":userFound.username,
                                "image":userFound.image,
                                "status":"actif",
                                "isAdmin":userFound.isAdmin,
                                "token": token
                            });        
                }).catch((err)=> {
                    return res.status(500).json({
                        "error": "cannot add last log"
                    });
                });           
            } else {
                return res.status(500).json({
                    "error": "cannot log user"
                });
            }
        });
    //#endregion
    },
    logout: (req,res)=> {
        let userId = parseInt(req.params.userId);
        models.User.findOne({
            where: { id:userId }
        }).then((userFound)=> {
            if(userFound) {
                userFound.update({
                    status:"inactif"
                }).then(()=> {
                    res.status(201).json(userFound.username+" deconnect");
                }).catch((err)=> {
                    res.status(500).json("cannot deconnect");
                });
            } else {
                res.status(404).json("user not found");
            }
        }).catch((err)=> {
            console.log(err);
            res.status(500).json("cannot update");
        });
    }
}