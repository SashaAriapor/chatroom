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

// Client Connection
io.on("connection", socket => {
    console.log("connected");
})


// Run App 
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));