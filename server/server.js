const express = require('express');
const mongoose = require('mongoose');
const { createServer } = require("http");
const { Server } = require("socket.io");
require('dotenv').config();
const UserRoutes = require('./routes/UserRoutes');
const { argv } = require('process');

// Express App
const app = express();

// Create HTTP server
const httpServer = createServer(app);

// Socket.IO server
const io = new Server(httpServer, {
  /* options */
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("num", (arg) => {
    // io.emit('num', arg); // Emit data to all connected clients
    socket.broadcast.emit('num', arg);
  });

  // Handle events here
  socket.on("disconnect", () => {
    console.log("User disconnected");
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
