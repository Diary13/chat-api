//Imports
const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http').createServer(app);
const bodyParser = require('body-parser');
const PORT = process.argv[2] || 5000;
const apiRouter = require('./apiRouter').router;
const models = require('./models');
const { Op } = require('sequelize');

const io = require('socket.io')(http, {
    cors: {
        origin:'*'
    }
});

//Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/uploads",express.static("uploads"));
app.use("/api/", apiRouter);

io.on('connection',(socket)=> {
    console.log('client connected');

    socket.on('join',(data)=> {
        console.log("user" + data.userId + " JOIN ROOM " + data.roomId);
        socket.join(data.roomId);
        // console.log(socket.adapter.rooms); 
        // socket.emit('join', data.username + 'vous rejoint');
    });
    socket.on('sendMessage',(data)=> {
        // socket.to(data.conversationId).emit('sendMessage',data);
        io.in(data.conversationId).emit('sendMessage',data);
    });
    socket.on('new_message',(data)=> {
        (data.vu == true)? io.of('/').to(data.receiverId + 'u').emit('new_message','1') : io.of('/').to(data.receiverId + 'u').emit('new_message','0')
        // models.Message.findOne({
        //     where: {
        //         [Op.and]: [{  text: data.text }, {conversationId: data.conversationId }, { createdAt:  data.createdAt }] 
        //     }
        // }).then((messageFound)=> {
        //     if(messageFound) {
        //         let tmp_message = JSON.stringify(messageFound,null,2);
        //         let message_obj = JSON.parse(tmp_message);
        //         console.log("MESSAGE:");
        //         console.log(message_obj);
        //         (message_obj.vu == true)? socket.to(data.receiverId + 'u').emit('new_message','1') : socket.to(data.receiverId + 'u').emit('new_message','0')
        //     }
        // }).catch((err)=> {
        //     console.log(err);
        // });
    });
    socket.on('user_actif',(data)=> {
        io.emit('user_actif',data);
    });
    socket.on('search_user',(data)=> {
        socket.emit('search_user',data);
    });
    socket.on('allUser',(users)=> {
        socket.emit('allUser',users);
    });

    socket.on("disconnect",()=> {
        console.log("client deconnected");
    })
});

http.listen(PORT, ()=> {
    console.log("server launched on port "+PORT);
});