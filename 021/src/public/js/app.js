const socket = io();

const welcome = document.querySelector("#welcome");
const form = welcome.querySelector("form");
const room = document.querySelector("#room");

room.hidden = true;
let roomName;

// -- 이벤트핸들러 ---
/** 방이름 Submit */
const handleRoomSubmit = (event) => {
  event.preventDefault();

  const input = form.querySelector("input");
  socket.emit("enter_room", { payload: input.value }, enterRoom);
  roomName = input.value;

  input.value = "";
};
form.addEventListener("submit", handleRoomSubmit);

/** 메시지 Submit */
const handleMessageSubmit = (event) => {
  event.preventDefault();

  const input = room.querySelector("input");
  socket.emit("new_message", input.value, roomName, () => {
    addMessage(`당신: ${input.value}`);
  });
};

/** 방 입장 */
const enterRoom = () => {
  welcome.hidden = true;
  room.hidden = false;

  const h2 = room.querySelector("h2");
  h2.innerHTML = `💎${roomName}💎`;

  const form = room.querySelector("form");
  form.addEventListener("submit", handleMessageSubmit);
};

/** 메시지 추가 */
const addMessage = (text) => {
  console.log("2");
  const ul = room.querySelector("ul");
  const li = document.createElement("li");
  li.innerHTML = text;
  ul.append(li);
};

// -- 이벤트리스너 ---
// Room Notifications
socket.on("welcome", () => {
  addMessage("누군가 방에 입장했습니다.😎");
});

socket.on("bye", () => {
  addMessage("누군가 방에서 나갔습니다.🖐");
});

socket.on("new_message", (text) => {
  addMessage(`익명: ${text}`);
});
