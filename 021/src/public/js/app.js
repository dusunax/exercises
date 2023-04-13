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
const handleMessageSendButtonClick = (event) => {
  event.preventDefault();

  const input = room.querySelector("#message input");
  socket.emit("new_message", input.value, chatRoomName, (text) => {
    addMessage(text);
  });

  input.value = "";
};

const handleRoomExitButtonClick = (event) => {
  event.preventDefault();

  socket.emit("leave_room", leaveRoom);
};

//----------------------------------------------------------------

/** 방 입장 */
const enterRoom = () => {
  welcome.hidden = true;
  room.hidden = false;

  const h2 = room.querySelector("h2");
  h2.innerHTML = `💎${chatRoomName}💎`;

  const msgForm = room.querySelector("#message");
  msgForm.addEventListener("submit", handleMessageSendButtonClick);

  const roomExitButton = room.querySelector("button#exit");
  roomExitButton.addEventListener("click", handleRoomExitButtonClick);
};

/** 방 퇴장 */
const leaveRoom = () => {
  welcome.hidden = false;
  room.hidden = true;

  const h2 = room.querySelector("h2");
  h2.innerHTML = `💎${chatRoomName}💎`;
};

/** 메시지 추가 */
const addMessage = (text) => {
  console.log(text);
  const ul = room.querySelector("ul");
  const li = document.createElement("li");
  li.innerHTML = text;
  ul.append(li);
};

// -- socket 이벤트리스너 ---
// Room Notifications
socket.on("welcome", (nickname, newCount) => {
  addMessage(
    `${
      nickname === "익명" ? "누군가" : nickname
    } 방에 입장함.😎 (현재 인원: ${newCount}명)`
  );

  const h2 = room.querySelector("h2");
  h2.innerHTML = `💎${chatRoomName}💎 / ${newCount}`;
});

socket.on("bye", (nickname, newCount) => {
  addMessage(
    `${
      nickname === "익명" ? "누군가" : nickname
    } 퇴장함.🖐 (현재 인원: ${newCount}명)`
  );

  const h2 = room.querySelector("h2");
  h2.innerHTML = `💎${chatRoomName}💎 / ${newCount}`;
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
