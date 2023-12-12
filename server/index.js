const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: { origin: "*" },
});

const hostname = "10.0.0.120";

const PORT = 3001;

io.on("connection", (socket) => {
  console.log("Usuário conectado!", socket.id);

  socket.on("disconnect", (reason) => {
    console.log("Usuário desconectado!", socket.id);
  });

  socket.on("set_username", (username) => {
    socket.data.username = username;

    io.emit("enter_chat", username);
  });

  socket.on("message", (content) => {
    console.log(content);
    console.log(socket.data.username);
    io.emit("receive_message", {
      content,
      authorId: socket.id,
      author: socket.data,
    });
  });

  socket.on("allusers", async () => {
    const res = [];
    const sockets = await io.fetchSockets();
    for (const socket of sockets) {
      res.push({
        id: socket.id,
        data: socket.data,
      });
      console.log(socket.id);
      console.log(socket.data);
    }
    io.emit("allusers", res);
  });

  socket.on("private_message", (socketId) => {
    io.sockets.socket(socketId).emit("private_message", () => {});
  });
});

server.listen(PORT, hostname, () =>
  console.log(`Server running at http://${hostname}:${PORT}`)
);
