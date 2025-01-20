const http = require("http");
const express = require("express");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("A user connected " + socket.id);

  socket.on("user-message", (message) => {
    io.emit("message", message);
  });
});

server.listen(9000, () => {
  console.log("Server is running on port 9000");
});
