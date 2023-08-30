const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('A user connected');

  // Get user's IP address
  const userIpAddress = socket.handshake.address;

  // Send user's IP to the client
  socket.emit('userIP', userIpAddress);

  socket.on('chat message', (msg) => {
    io.emit('chat message', { message: msg, ipAddress: userIpAddress });
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(3000, () => {
  console.log('Listening on *:3000');
});
