const socket = io();

// 카메라 contents
const localContents = document.querySelector("#localContents");
const remoteContents = document.querySelector("#remoteContents");
const localVideo = localContents.querySelector("video");
const remoteVideo = remoteContents.querySelector("video");
const localUsername = localContents.querySelector(".userName");
const remoteUsername = remoteContents.querySelector(".userName");

// 버튼 및 select
const muteBtn = document.querySelector("#mute");
const cameraBtn = document.querySelector("#camera");
const cameraSelect = document.querySelector("#cameraSelect");
const reciveSoundBtn = document.querySelector("#reciveSound");

// 변수
let localStream;
let remoteStream;
let peerConnection;

let currentRoomName = "";
let currentUserName = "";
let currentRemoteName = "";
let numUsers = 0;

let isMuted = false;
let isCameraOff = false;
let isSoundOff = false;

// phone call : form
const welcome = document.querySelector("#welcome");
const welcomeForm = welcome.querySelector("form");
const call = document.querySelector("#call");

call.hidden = true;

// --------------------------------
// init & 방 입장
const initCall = async () => {
  welcome.hidden = true;
  call.hidden = false;

  await getMedia();
  makeConnection();
};

const handleWelcomeSubmit = async (event) => {
  event.preventDefault();
  const roomNameInput = welcomeForm.querySelector("input#roomName");
  const userNameInput = welcomeForm.querySelector("input#userName");
  currentRoomName = roomNameInput.value;
  currentUserName = userNameInput.value;

  document.getElementById("title").innerHTML = `📸 ${currentRoomName} 💎`;

  await initCall();
  console.log(`${roomNameInput.value}에 입장했습니다.`);
  localUsername.innerHTML = currentUserName;

  socket.emit("join_room", roomNameInput.value, userNameInput.value);
  roomNameInput.value = "";
  userNameInput.value = "";
};
welcomeForm.addEventListener("submit", handleWelcomeSubmit);

// --------------------------------
// 카메라 기능

/**
 * 카메라 디바이스 정보를 가져옵니다.
 * select#cameraSelect의 option을 설정합니다.
 */
const getCameras = async () => {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const cameras = devices.filter((device) => device.kind === "videoinput");
    const currentCamera = localStream.getVideoTracks()[0];
    cameraSelect.innerHTML = "";

    cameras.forEach((camera) => {
      const option = document.createElement("option");
      option.value = camera.deviceId; // 유저 디바이스의 id
      option.innerText = camera.label;
      cameraSelect.appendChild(option);

      if (currentCamera?.label === camera.label) {
        option.selected = true;
      }
    });
  } catch (e) {
    console.log(e);
  }
};

/** 미디어 데이터를 출력합니다.
 * video에 navigator mediaDevices의 stream을 할당합니다.
 */
const getMedia = async (deviceId) => {
  // 카메라 Constrains
  const initialConstrains = {
    audio: true,
    video: { facingMode: "user" },
  };
  const cameraConstrains = {
    audio: true,
    video: { deviceId: { exact: deviceId } },
  };

  try {
    localStream = await navigator.mediaDevices.getUserMedia(
      deviceId ? cameraConstrains : initialConstrains
    );
    localVideo.srcObject = localStream;

    if (!deviceId) {
      await getCameras();
    }

    // 카메라의 설정을 확인합니다.
    localStream.getAudioTracks().forEach((track) => (track.enabled = !isMuted));
    localStream
      .getVideoTracks()
      .forEach((track) => (track.enabled = !isCameraOff));
  } catch (e) {
    console.log(e);
  }
};

// getMedia();
// getCameras();

// --------------------------------
// 이벤트 핸들러

/** 음소거/음소거 해제 버튼을 클릭했을 때, 오디오를 토글합니다. */
const handleMuteClick = () => {
  isMuted = !isMuted;

  localStream.getAudioTracks().forEach((track) => (track.enabled = !isMuted));
  remoteStream?.getAudioTracks().forEach((track) => (track.enabled = !isMuted));

  if (isMuted) {
    muteBtn.innerHTML = "음소거 해제";
  } else {
    muteBtn.innerHTML = "음소거";
  }
};

/** 카메라 켜기/끄기 버튼을 클릭했을 때, 비디오를 토글합니다. */
const handleCameraClick = () => {
  isCameraOff = !isCameraOff;

  localStream
    .getVideoTracks()
    .forEach((track) => (track.enabled = !isCameraOff));

  if (isCameraOff) {
    cameraBtn.innerHTML = "카메라 켜기";
  } else {
    cameraBtn.innerHTML = "카메라 끄기";
  }
};

/** 카메라를 변경합니다. */
const handleCameraSelect = async () => {
  await getMedia(cameraSelect.value);
  if (peerConnection) {
    const videoTrack = localStream.getVideoTracks()[0];
    const videoSender = peerConnection
      .getSenders()
      .find((sender) => sender.track.kind === "video");

    videoSender.replaceTrack(videoTrack);
  }
};

const handleReciveSoundClick = () => {
  isSoundOff = !isSoundOff;
  muteBtn.hidden = isSoundOff ? true : false;

  remoteStream
    .getAudioTracks()
    .forEach((track) => (track.enabled = !isSoundOff));
  localStream
    .getAudioTracks()
    .forEach((track) => (track.enabled = !isSoundOff));

  if (isSoundOff) {
    reciveSoundBtn.innerHTML = "전체 오디오 켜기";
  } else {
    reciveSoundBtn.innerHTML = "전체 오디오 끄기";
  }
};

muteBtn.addEventListener("click", handleMuteClick);
cameraBtn.addEventListener("click", handleCameraClick);
reciveSoundBtn.addEventListener("click", handleReciveSoundClick);
cameraSelect.addEventListener("input", handleCameraSelect);

// --------------------------------
// socket

socket.on("welcome", async (newUser) => {
  console.log(newUser === "익명" ? "누군가 입장" : newUser + " 입장");

  const offer = await peerConnection.createOffer();
  peerConnection.setLocalDescription(offer);

  socket.emit("offer", offer, currentRoomName, currentUserName);
});

/** offer를 받았을 때 */
socket.on("offer", async (offer, newUserName) => {
  peerConnection.setRemoteDescription(offer);

  const answer = await peerConnection.createAnswer();
  peerConnection.setLocalDescription(answer);

  remoteUsername.innerHTML = newUserName;
  console.log("입장한 유저: " + newUserName, " 기존 유저: " + currentUserName);

  socket.emit("answer", answer, currentRoomName, currentUserName);
});

/** answer를 받았을 때 */
socket.on("answer", (answer, prevUserName) => {
  peerConnection.setRemoteDescription(answer);
  remoteUsername.innerHTML = prevUserName;
});

socket.on("ice", (iceCandidate) => {
  peerConnection.addIceCandidate(iceCandidate);
});

// RTC
const handleIceCandidate = (data) => {
  socket.emit("ice", data.candidate, currentRoomName);
};

const handleAddStream = (data) => {
  remoteStream = data.stream;
  remoteVideo.srcObject = remoteStream;
};

/** 연결을 시도하는 곳에서 실행 */
const makeConnection = async () => {
  peerConnection = new RTCPeerConnection({
    iceServers: [
      {
        urls: [
          "stun:stun.l.google.com:19302",
          "stun:stun1.l.google.com:19302",
          "stun:stun2.l.google.com:19302",
          "stun:stun3.l.google.com:19302",
          "stun:stun4.l.google.com:19302",
        ],
      },
    ],
  });
  peerConnection.addEventListener("icecandidate", handleIceCandidate);
  peerConnection.addEventListener("addstream", handleAddStream);
  localStream
    .getTracks()
    .forEach((track) => peerConnection.addTrack(track, localStream));
};
