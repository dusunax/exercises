import http from "http";
import SocketIO from "socket.io";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));

app.get("/", (_, res) => res.render("home"));

const PORT = 3000;
const handleListen = () => console.log("Listen on http://localhost:" + PORT);

const httpServer = http.createServer(app);
const io = SocketIO(httpServer);

io.on("connection", (socket) => {
  socket["nickname"] = "익명";

  // 입장
  socket.on("enter_room", (roomName, done) => {
    socket.join(roomName.payload);
    done();

    socket.to(roomName.payload).emit("welcome");
  });

  // 퇴장
  socket.on("disconnecting", () => {
    socket.rooms.forEach((room) =>
      socket.to(room).emit("bye", socket.nickname)
    );
  });

  // 채팅
  socket.on("new_message", (msg, roomName, done) => {
    socket.to(roomName).emit("new_message", `${socket.nickname}: ${msg}`);
    done();
  });

  // 닉네임 저장
  socket.on("new_nickname", (nickname) => {
    console.log(nickname);
    socket["nickname"] = nickname;
  });
});

httpServer.listen(PORT, handleListen);
