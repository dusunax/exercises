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
  console.log(socket);
});

// 임시 DB
// const sockets = [];

// wss.on("connection", (socket) => {
//   sockets.push(socket);
//   socket["nickname"] = "익명";

//   socket.on("close", () => {
//     return console.log("disconnect socket");
//   });

//   console.log("브라우저와 연결되었습니다.");
//   socket.send("안녕~🖐");

//   // 메시지 이벤트 리스너
//   socket.on("message", (message) => {
//     const parsed = JSON.parse(message.toString());

//     switch (parsed.type) {
//       case "new_message":
//         sockets.forEach((eachSocket) =>
//           eachSocket.send(`${socket.nickname}: ${parsed.payload} `)
//         );
//         break;
//       case "nickname":
//         socket["nickname"] = parsed.payload;
//         break;
//       default:
//     }
//   });
// });

httpServer.listen(PORT, handleListen);
