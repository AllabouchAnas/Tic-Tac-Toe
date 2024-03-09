const MAX_USERS_PER_ROOM = 2;
const queue = new Map();

function socket(io) {
    io.on("connection", (socket) => {
        console.log(`User connected with ID: ${socket.id}`);

        socket.on("joinQueue", () => {
            queue.set(socket.id, socket);

            if (queue.size >= MAX_USERS_PER_ROOM) {
                const roomName = 'room_' + Math.random().toString(36).substring(7);
                const players = Array.from(queue.values()).splice(0, 2);

                players.forEach(player => {
                    player.join(roomName);
                    queue.delete(player.id);
                    console.log(`User: ${socket.id} connected to room: ${roomName}`)
                });

                io.to(roomName).emit('startGame', roomName);
            }
        });

        socket.on("joinRoom", (room) => {
            const roomClients = io.sockets.adapter.rooms.get(room);
            // if (roomClients && roomClients.size >= MAX_USERS_PER_ROOM) {
            //     // Room is full, do not allow more users to join
            //     socket.emit("roomFull");
            //     return;
            // }
            socket.join(room);
            console.log(`User ${socket.id} joined room ${room}`)
        });

        socket.on("num", (arg) => {
            socket.to(arg.room).emit('num', arg);
            console.log(arg)
        });

        socket.on("disconnect", () => {
            console.log(`User disconnected with ID: ${socket.id}`);

            if (queue.has(socket.id)) {
                queue.delete(socket.id);
            }

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
}

module.exports = socket;
