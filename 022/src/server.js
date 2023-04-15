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

io.on("connection", (socket) => {
  socket.onAny((event) => console.log("이벤트: " + event));

  socket.on("join_room", (roomName) => {
    socket.join(roomName);
  });

  socket.on("offer", (offer, roomName, userName) => {
    socket.to(roomName).emit("offer", offer, userName);
  });

  socket.on("answer", (answer, roomName, userName) => {
    socket.to(roomName).emit("answer", answer, userName);

    socket.emit("welcome");
  });

  socket.on("ice", (iceCandidate, roomName) => {
    socket.to(roomName).emit("ice", iceCandidate);
  });
});

httpServer.listen(PORT, handleListen);
