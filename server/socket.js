const { Server } = require("socket.io");

export default (httpServer) => {
const io = new Server(httpServer, {
    cors: {
        origin: "*"
    },
  });
}