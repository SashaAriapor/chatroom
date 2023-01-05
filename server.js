// Require Modules
const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const { formatMessage } = require("./formats/messages");
const { userJoin, getUser, userLeave, getRoom } = require("./utils/users");

// Config Environment
require("dotenv").config();

// Config App
const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set Static Folder 
app.use(express.static(path.join(__dirname, "public")));

// Set Varibels
const botName = process.env.BOT_NAME || "botName";
const PORT = process.env.PORT || 3000;

// Socket Listener Part 
io.on("connection", socket => {
    socket.on("joinRoom", ({username, room}) => {
        // create user and save this on memory
        const user = userJoin(socket.id, username, room);
        socket.join(user.room);
        // Listening To Connection'
        socket.emit("message", formatMessage(botName, `${user.username} Welcome To Chat`));
        // Broadcast New Connection
        socket.broadcast.to(user.room).emit("message", formatMessage(botName, `${user.username} has join the Chat`));
        // Send room info 
        io.to(user.room).emit("roomUsers", {
            room: user.room,
            users: getRoom(user.room)
        });
        // Listening To Disconnection
        socket.on("disconnect", () => {
            const user = userLeave(socket.id);
            if (user) {
                io.to(user.room).emit("message", formatMessage(botName, `${user.username} has left the Chat`));
        // Send room info 

                io.to(user.room).emit("roomUsers", {
                    room: user.room,
                    users: getRoom(user.room)
                });
            }
        });
    });
    // Listen For ChatMessage
    socket.on("chatMessage", (msg) => {
        const user = getUser(socket.id);
       io.to(user.room).emit("message", formatMessage(user.username, msg));
    });
});

// Run App 
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));