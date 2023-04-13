const socket = io();

const welcome = document.querySelector("#welcome");
const welcomeForm = welcome.querySelector("form");
const room = document.querySelector("#room");

room.hidden = true;
let chatRoomName;

// -- 이벤트핸들러 ---
/** 방입장 Submit */
const handleRoomSubmit = (event) => {
  event.preventDefault();

  const nickname = welcomeForm.querySelector("input#nickname");
  const roomName = welcomeForm.querySelector("input#roomName");
  socket.emit(
    "enter_room",
    { payload: { nickname: nickname.value, roomName: roomName.value } },
    enterRoom
  );
  chatRoomName = roomName.value;
};
welcomeForm.addEventListener("submit", handleRoomSubmit);

/** 메시지 Submit */
const handleMessageSubmit = (event) => {
  event.preventDefault();

  const input = room.querySelector("#message input");
  socket.emit("new_message", input.value, chatRoomName, (text) => {
    addMessage(text);
  });

  input.value = "";
};

/** 방 입장 */
const enterRoom = () => {
  welcome.hidden = true;
  room.hidden = false;

  const h2 = room.querySelector("h2");
  h2.innerHTML = `💎${chatRoomName}💎`;

  const msgForm = room.querySelector("#message");
  msgForm.addEventListener("submit", handleMessageSubmit);
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
socket.on("welcome", (nickname) => {
  addMessage(`${nickname === "익명" ? "누군가" : nickname} 방에 입장함.😎`);
});

socket.on("bye", (nickname) => {
  addMessage(`${nickname === "익명" ? "누군가" : nickname} 퇴장함.🖐`);
});

socket.on("new_message", (text) => {
  addMessage(text);
});

// 방 전환
socket.on("room_change", (rooms) => {
  console.log("hi", rooms);

  const roomList = welcome.querySelector("ul");
  roomList.innerHTML = "";

  rooms.forEach((room) => {
    const li = document.createElement("li");
    li.innerText = room;
    roomList.appendChild(li);
  });
});
