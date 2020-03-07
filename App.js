const path = require('path');

const express = require('express');
const app = express();

//Settings
app.set('PORT', 3000);

//Statics files
app.use(express.static(path.join(__dirname, 'public')));

const server = app.listen(app.get('PORT'), () => {
    console.log(`Server on port ${app.get('PORT')}`);
});

//My Socket❤❤
const SocketIO = require('socket.io');

const io = SocketIO.listen(server);

io.on('connection', (socket) => {
    socket.on('new:message', (data) => {
        io.sockets.emit('chat:message', data);
    });
    socket.on('action:typing', (data) => {
        socket.broadcast.emit('action:typing', data);
    })
});


