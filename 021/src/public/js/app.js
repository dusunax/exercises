const socket = io();

const welcome = document.querySelector("#welcome");
const welcomeForm = welcome.querySelector("form");
const room = document.querySelector("#room");

room.hidden = true;
let roomName;

// -- 이벤트핸들러 ---
/** 방이름 Submit */
const handleRoomSubmit = (event) => {
  event.preventDefault();

  const input = welcomeForm.querySelector("input");
  socket.emit("enter_room", { payload: input.value }, enterRoom);
  roomName = input.value;

  input.value = "";
};
welcomeForm.addEventListener("submit", handleRoomSubmit);

/** 메시지 Submit */
const handleMessageSubmit = (event) => {
  event.preventDefault();

  const input = room.querySelector("#message input");
  const value = input.value; // 변수에 담아서 보내기
  socket.emit("new_message", input.value, roomName, () => {
    addMessage(`나: ${value}`);
  });

  input.value = "";
};

/** 메시지 Submit */
const handleNicknameSubmit = (event) => {
  console.log("hi");
  event.preventDefault();

  const input = room.querySelector("#nickname input");
  socket.emit("new_nickname", input.value);
  input.value = "";
};

/** 방 입장 */
const enterRoom = () => {
  welcome.hidden = true;
  room.hidden = false;

  const h2 = room.querySelector("h2");
  h2.innerHTML = `💎${roomName}💎`;

  const msgForm = room.querySelector("#message");
  const nicknameForm = room.querySelector("#nickname");
  msgForm.addEventListener("submit", handleMessageSubmit);
  nicknameForm.addEventListener("submit", handleNicknameSubmit);
};

/** 메시지 추가 */
const addMessage = (text) => {
  console.log(text);
  const ul = room.querySelector("ul");
  const li = document.createElement("li");
  li.innerHTML = text;
  ul.append(li);
};

// -- 이벤트리스너 ---
// Room Notifications
socket.on("welcome", () => {
  addMessage(`누군가 방에 입장함.😎`);
});

socket.on("bye", (nickname) => {
  addMessage(`${nickname === "익명" ? "누군가" : nickname} 퇴장함.🖐`);
});

socket.on("new_message", (text) => {
  addMessage(text);
});
