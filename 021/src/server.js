import http from "http";
import express from "express";
import { Server } from "socket.io";
import { instrument } from "@socket.io/admin-ui";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));

app.get("/", (_, res) => res.render("home"));

const PORT = 3000;
const handleListen = () => console.log("Listen on http://localhost:" + PORT);

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ["https://admin.socket.io"],
    credential: true,
  },
});

instrument(io, {
  auth: false,
});

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

const countRooms = (roomName) => {
  return io.sockets.adapter.rooms.get(roomName)?.size;
};

const exitAllRoom = (socket) => {
  socket.rooms.forEach((roomName) => {
    socket.leave(roomName);

    const remainingUsers = countRooms(roomName); // 방을 떠난 후 남은 유저 수
    socket.to(roomName).emit("bye", socket.nickname, remainingUsers);
  });
  io.sockets.emit("room_change", publicRooms());
};

const exitRoom = (socket, roomName) => {
  socket.leave(roomName);

  const remainingUsers = countRooms(roomName) - 1; // 방을 떠난 후 남은 유저 수
  socket.to(roomName).emit("bye", socket.nickname, remainingUsers);

  io.sockets.emit("room_change", publicRooms());
};

// ----------------------------------------------------------------

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
    socket.to(roomName).emit("welcome", socket.nickname, countRooms(roomName));
    io.sockets.emit("room_change", publicRooms());
  });

  // 퇴장A. 유저가 방을 떠나기 바로 전 disconnecting (인사)
  socket.on("disconnecting", () => {
    socket.rooms.forEach(
      (roomName) =>
        socket
          .to(roomName)
          .emit("bye", socket.nickname, countRooms(roomName) - 1)
      // 사용자가 아직 room을 떠나지 않았으므로, room의 size를 구할 수 있음
      // 사용자가 아직 room을 떠나지 않았으므로, countRooms 반환값에 -1
    );
  });

  // 퇴장B. 유저가 방을 떠난 후
  socket.on("disconnect", () => {
    exitAllRoom(socket);
  });

  // 퇴장C. 유저가 방 나가기 버튼을 클릭함
  socket.on("leave_room", (done) => {
    exitAllRoom(socket);

    done();
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
