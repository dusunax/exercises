import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));

app.get("/", (_, res) => res.render("home"));

const PORT = 3000;
const handleListen = () => console.log("Listen on http://localhost:" + PORT);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// 임시 DB
const sockets = [];

wss.on("connection", (socket) => {
  sockets.push(socket);

  socket.on("close", () => {
    return console.log("disconnect socket");
  });

  console.log("브라우저와 연결되었습니다.");
  socket.send("안녕~🖐");

  socket.on("message", (message) => {
    sockets.forEach((eachSocket) => eachSocket.send(message.toString()));
  });
});

server.listen(PORT, handleListen);
