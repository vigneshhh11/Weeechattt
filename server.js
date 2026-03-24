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

let messages = [];

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.emit("load_messages", messages);

    socket.on("send_message", (data) => {
        messages.push(data);
        io.emit("receive_message", data);
    });
});

app.get("/", (req, res) => {
    res.send("Server is running");
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log("Server running on port", PORT);
});
