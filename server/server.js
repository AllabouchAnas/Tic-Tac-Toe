const express = require('express');
const mongoose = require('mongoose');
const { createServer } = require("http");
const { Server } = require("socket.io");
require('dotenv').config();
const UserRoutes = require('./routes/UserRoutes')
const { argv } = require('process');

// Express App
const app = express();

// Create HTTP server
const httpServer = createServer(app);

// Socket.IO server
const io = new Server(httpServer, {
  /* options */
});

const MAX_USERS_PER_ROOM = 2; // Maximum number of users per room

// Map to track players waiting to join a game
const queue = new Map(); 

io.on("connection", (socket) => {
    console.log(`User connected with ID: ${socket.id}`);

    // Handle player joining the queue
    socket.on("joinQueue", () => {
        queue.set(socket.id, socket); // Add player to the queue

        // Check if there are enough players in the queue to start a game
        if (queue.size >= MAX_USERS_PER_ROOM) {
            // Match two players and create a room for them
            const roomName = 'room_' + Math.random().toString(36).substring(7); // Generate a unique room name
            const players = Array.from(queue.values()).splice(0, 2); // Get first two players from the queue

            players.forEach(player => {
                player.join(roomName);
                queue.delete(player.id); // Remove player from the queue
                console.log(`User: ${socket.id} connected to room: ${roomName}`)
            });

            // Notify players to start the game and pass the room name
            io.to(roomName).emit('startGame', roomName);
        }
    });

    socket.on("joinRoom", (room) => {
        const roomClients = io.sockets.adapter.rooms.get(room); // Get all clients in the room
        // if (roomClients && roomClients.size >= MAX_USERS_PER_ROOM) {
        //     // Room is full, do not allow more users to join
        //     socket.emit("roomFull");
        //     return;
        // }

        socket.join(room);
        console.log(`User ${socket.id} joined room ${room}`)
    });

    socket.on("num", (arg) => {
      socket.to(arg.room).emit('num', arg); // Emit data to all clients in the same room except the sender
      console.log(arg)
  });

    // Handle events here
    socket.on("disconnect", () => {
        console.log(`User disconnected with ID: ${socket.id}`);
        // Remove the disconnected user from the queue if they were in the queue
        if (queue.has(socket.id)) {
            queue.delete(socket.id);
        }
        // Update the count of users in the room upon disconnection
        const rooms = io.sockets.adapter.rooms;
        if (rooms) {
            rooms.forEach((value, room) => {
                if (value.has(socket.id)) {
                    io.to(room).emit('userLeft', socket.id);
                }
            });
        }
    });
});


// middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use('/api/user', UserRoutes);

// Connect to db
mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log('Connected to db.');
  // Start HTTP server
  const port = process.env.PORT || 4000;
  httpServer.listen(port, () => console.log(`Listening on http://localhost:${port}.`));
}).catch((error) => {
  console.log('Connection Error!', error);
});
