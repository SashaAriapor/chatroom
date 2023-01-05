// Require Modules
const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");

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
    // Listening To Connection
    socket.emit("message", "welcome To ChatRoom");
    // Broadcast New Connection
    socket.broadcast.emit("message", "A user has Joind the Chat");
    // Listening To Disconnection
    socket.on("disconnect", () => {
        io.emit("message", "A user has left the chat");
    });
    // Listen For ChatMessage
    socket.on("chatMessage", (msg) => {
        console.log(msg);
    });
});

// Run App 
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));