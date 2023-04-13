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

/** 공개방 배열을 return합니다.
 * 1. adapter의 rooms와 sids를 비교합니다.
 * 2. sids에만 존재하는 방을 찾습니다.(=== 공개방)
 * */
const publicRooms = () => {
  const { sids, rooms } = io.sockets.adapter;

  const publicRooms = [];
  rooms.forEach((_, key) => {
    if (sids.get(key) === undefined) publicRooms.push(key);
  });
  return publicRooms;
};

// 접속
io.on("connection", (socket) => {
  socket["nickname"] = "익명";
  socket.onAny((event) => {
    console.log(`소켓 이벤트 ${event}`);
    // console.log(io.sockets.adapter);
    // 소켓의 adapter 확인
    // 1.sids ⇒ socket ids
    // 2.rooms => 방
  });

  // 입장
  socket.on("enter_room", ({ payload }, done) => {
    const { nickname, roomName } = payload;

    socket.join(roomName);
    done();

    socket["nickname"] = nickname;
    socket.to(roomName).emit("welcome", socket.nickname);
    io.sockets.emit("room_change", publicRooms());
  });

  // 퇴장A. 유저가 방을 떠나기 바로 전 disconnecting
  socket.on("disconnecting", () => {
    socket.rooms.forEach((room) =>
      socket.to(room).emit("bye", socket.nickname)
    );
  });

  // 퇴장B. 유저가 방을 떠난 후
  socket.on("disconnect", () => {
    io.sockets.emit("room_change", publicRooms());
  });

  // 채팅
  socket.on("new_message", (msg, roomName, done) => {
    socket.to(roomName).emit("new_message", `${socket.nickname}: ${msg}`);
    done(`${socket.nickname}: ${msg}`);
  });

  // 새 닉네임 또는 닉네임 수정
  socket.on("new_nickname", (nickname) => {
    socket["nickname"] = nickname;
  });
});

httpServer.listen(PORT, handleListen);
