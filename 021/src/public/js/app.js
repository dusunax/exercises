const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", () => {
  console.log("Connection to Server established 👩‍🏭");
});

socket.addEventListener("message", (message) => {
  console.log("New Message: ", message);
});

socket.addEventListener("close", () => {
  console.log("Connection closed");
});

document.querySelector("button").addEventListener("click", () => {
  socket.send("브라우저에서 보내는 메시지");
});
