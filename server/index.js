const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: { origin: "*" },
});

const hostname = "192.168.0.126";

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
      author: socket.data.username,
    });
  });
});

server.listen(PORT, hostname, () =>
  console.log(`Server running at http://${hostname}:${PORT}`)
);
