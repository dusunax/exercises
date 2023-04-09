const messageList = document.querySelector("ul");
const messageForm = document.querySelector("form");

const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", () => {
  console.log("Connection to Server established 👩‍🏭");
});

socket.addEventListener("message", (message) => {
  const li = document.createElement("li");
  li.innerHTML = message.data.toString();
  messageList.append(li);
});

socket.addEventListener("close", () => {
  console.log("Connection closed");
});

// 채팅 기능 시작
function handleSumbitMessage() {
  event.preventDefault();

  const input = messageForm.querySelector("input");
  socket.send(input.value.toString());
  input.value = "";
}

messageForm.addEventListener("submit", handleSumbitMessage);
