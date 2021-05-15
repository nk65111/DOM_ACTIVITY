const express = require("express");
// const { Server } = require("socket.io");
// server is created !!!
const io = require('socket.io')();
const app = express();
const http = require('http');
// const server = http.createServer(app);
// const io = new Server(server);


app.use(express.static("public"));


io.on("connection" , function(socket){
    console.log("connected !!!");
    console.log(socket.id);
});


app.listen(3000,function(){
    console.log("port 3000 listening");
})