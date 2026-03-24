const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" }
});

// Serve your HTML
app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Temporary message storage
let messages = [];

io.on("connection", (socket) => {
  console.log("User connected");

  socket.emit("load_messages", messages);

  socket.on("send_message", (data) => {
    messages.push(data);
    io.emit("receive_message", data);
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
