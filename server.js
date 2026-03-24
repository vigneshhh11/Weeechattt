const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

// store messages (temporary)
let messages = [];

io.on("connection", (socket) => {
    console.log("User connected");

    // send old messages
    socket.emit("load_messages", messages);

    socket.on("send_message", (data) => {
        messages.push(data);

        // send to ALL users
        io.emit("receive_message", data);
    });
});

app.get("/", (req, res) => {
    res.send("Server is running");
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});
