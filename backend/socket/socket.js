var http = require('http');
var express = require('express');
var socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});

let userSocketMap = {}; // {userId: socketId}

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);

  const userId = socket.handshake.query.userId;
  if (userId !== undefined) {
    userSocketMap[userId] = socket.id;
  }

  // Broadcast online users to all connected clients
  io.emit('getOnlineUsers', Object.keys(userSocketMap));

  // Handle user disconnection
  socket.on('disconnect', () => {
    console.log('user disconnected', socket.id);
    delete userSocketMap[userId];
    io.emit('getOnlineUsers', Object.keys(userSocketMap));
  });
});

// Export for external access (if needed) 
module.exports = {io ,app, server};