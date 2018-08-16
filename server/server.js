const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const moment = require('moment');

const publicPath = path.join(__dirname + './../public');
const port = process.env.port || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket)=>{
    console.log('New user connected');

    socket.on('disconnect', ()=>{
        console.log('User disconnected');
    });

    socket.emit('newMessage', {
        from: 'Admin',
        text: 'Welcome to the chat app',
        createdAt: moment(new Date().getTime()).format('h:mm:ss a')
    });

    socket.on('createMessage', (message)=>{
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: moment(new Date().getTime()).format('h:mm:ss a')
        });
        console.log('Message created', message);
    });

    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'New user join',
        createdAt: moment(new Date().getTime()).format('h:mm:ss a')
    });
})

server.listen(port, ()=>{
    console.log(`Server is up on ${port}`);
});
