const messageList = document.querySelector("ul");
const messageForm = document.querySelector("#message");
const nicknameForm = document.querySelector("#nickname");

const socket = new WebSocket(`ws://${window.location.host}`);

// util

function makeMessage(type, payload) {
  const message = { type, payload };
  return JSON.stringify(message);
}

// 이벤트리스너
socket.addEventListener("open", () => {
  console.log("Connection to Server established 👩‍🏭");
});

socket.addEventListener("close", () => {
  console.log("Connection closed");
});

socket.addEventListener("message", (message) => {
  const li = document.createElement("li");

  const newMessage = message.data;
  li.innerHTML = newMessage;
  messageList.append(li);
});

// 채팅 기능 시작
function handleSumbitMessage() {
  event.preventDefault();

  const input = messageForm.querySelector("input");
  socket.send(makeMessage("new_message", input.value));
  input.value = "";
}

function handleSumbitNickname() {
  event.preventDefault();

  const input = nicknameForm.querySelector("input");
  socket.send(makeMessage("nickname", input.value));
  input.value = "";
}

messageForm.addEventListener("submit", handleSumbitMessage);
nicknameForm.addEventListener("submit", handleSumbitNickname);
