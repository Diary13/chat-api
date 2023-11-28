//Imports
var express = require("express");
var multer = require("multer");
var usersCtrl = require("./controllers/usersCtrl");
var messagesCtrl = require("./controllers/messagesCtrl");
var conversationsCtrl = require("./controllers/conversationsCtrl");

//pour filtrer le format de l'image
const imageFilter = (req,file,next)=> {
    if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/png')
        next(null,true);
    else
        next("error: use only .jpg format ",false);
}
const uploadImage = multer({
    dest: "uploads/images/",
    fileFilter: imageFilter
});

//Router
exports.router=(()=> {
    var apiRouter = express.Router();

    //Users routes
    apiRouter.route("/users/register/").post(uploadImage.single("image"),usersCtrl.register);
    apiRouter.route("/users/:userId").get(usersCtrl.getUser);
    apiRouter.route("/users/all/get/").get(usersCtrl.getAllUser);
    apiRouter.route("/users/update/:userId").put(uploadImage.single("image"),usersCtrl.updateUserProfile);
    apiRouter.route("/users/delete/:userId").delete(usersCtrl.deleteUser);
    apiRouter.route("/users/login/").post(usersCtrl.login);
    apiRouter.route("/users/logout/:userId").post(usersCtrl.logout);

    //Messages routes
    apiRouter.route("/messages/:conversationId/:receiverId/:senderId").post(messagesCtrl.createMessage);
    apiRouter.route("/messages/all/:conversationId").get(messagesCtrl.getAllMessages);
    apiRouter.route("/messages/delete/:messageId").post(messagesCtrl.deleteMessage);
    apiRouter.route("/messages/update/all/:userId/:conversationId").post(messagesCtrl.updateStatusVu);

    //Conversations routes
    apiRouter.route("/conversations/create/:receiverId/:senderId").post(conversationsCtrl.createConversation);
    apiRouter.route("/conversations/update/:userId/:conversationId").post(conversationsCtrl.updateLiaison);
    apiRouter.route("/conversations/update/logout/all/:userId").post(conversationsCtrl.updateAllLiaisonUserLogout);
    apiRouter.route("/conversations/:userId").get(conversationsCtrl.getUsersWithConversation);

    //test
    //apiRouter.route("/test").post(usersCtrl.test);

    return apiRouter;
})();