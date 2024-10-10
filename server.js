const fs = require('fs');
const https = require('https');
const express = require('express');
const socketIo = require('socket.io');

const app = express();
const server = https.createServer({
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
}, app);
const io = socketIo(server);

app.use(express.static(__dirname));

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('message', (msg) => {
        console.log('message: ' + msg);
        socket.emit('message', 'Hello from server!');
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(8080, () => {
    console.log('listening on port 8080');
});