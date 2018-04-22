const express = require("express");
const path = require("path");
const http = require("http");
const socketIO = require("socket.io");
const {createMessage,createLocationMessage} = require("./utils/message");
const {isRealString} = require("../public/js/libs/validation");
const {Users} = require("./utils/Users");


let app = express(),
    port = process.env.PORT || 3000;

let server = http.createServer(app),
    IO = socketIO(server);

let users = new Users();


IO.on("connection", (socket) => {

    console.log("User start connection !!");


    socket.on("join",function (data,callback) {

        if (!isRealString(data.name) || !isRealString(data.room)){
            return callback("Access denied !!")
        }

        data.room = data.room.toLowerCase();

        socket.join(data.room);

        users.removeUser(socket.id);

        if (users.addUser(socket.id,data.name,data.room)){
            callback("the user is already exist!!");
            return

        }

        IO.emit("updateUserRoomList",users.getUserRoom());

        IO.to(data.room).emit("updateUserList",users.getUserList(data.room));
        socket.emit("newMessage",createMessage("Admin","Welcome to my chat"));
        socket.broadcast.to(data.room).emit("newMessage",createMessage("Admin",`${data.name} has joined`));

        callback();
    });



    socket.on("createMessage",function (data,callback) {
        var user = users.getUser(socket.id)[0];

        if (user && isRealString(user.name)){
            IO.to(user.room).emit("newMessage",createMessage(user.name,data.text))

        }
        callback();
    });

    socket.on("createLocationMessage",function (data) {
        var user = users.getUser(socket.id)[0];

        if (user) {
            IO.to(user.room).emit("newLocationMessage", createLocationMessage(user.name, data.latitude, data.longitude))

        }
    });


    socket.on("disconnect", () => {
        console.log("User interrupt the connection !!");

        let user = users.removeUser(socket.id)[0];

        if (user){
            IO.to(user.room).emit("updateUserList",users.getUserList(user.room));
            IO.to(user.room).emit("newMessage",createMessage("Admin",`${user.name} has left`));
            IO.emit("updateUserRoomList",users.getUserRoom());
        }
    })

});


app.use(express.static(path.join(__dirname, "../public")));


server.listen(port, () => {
    console.log(`Starting connecting in ${port} port`)
});