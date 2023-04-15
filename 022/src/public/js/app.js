const socket = io();

// 카메라
const localFace = document.querySelector("#localFace");
const remoteFace = document.querySelector("#remoteFace");

// 버튼
const muteBtn = document.querySelector("#mute");
const cameraBtn = document.querySelector("#camera");
const cameraSelect = document.querySelector("#cameraSelect");
const reciveSoundBtn = document.querySelector("#reciveSound");

// 변수
let localStream;
let remoteStream;
let currentRoomName = "";
let peerConnection;

let isMuted = false;
let isCameraOff = false;
let isSoundOff = false;

// phone call : form
const welcome = document.querySelector("#welcome");
const welcomeForm = welcome.querySelector("form");
const call = document.querySelector("#call");

call.hidden = true;

// --------------------------------
// call 기능
const initCall = async () => {
  welcome.hidden = true;
  call.hidden = false;

  await getMedia();
  makeConnection();
};

const handleWelcomeSubmit = async (event) => {
  event.preventDefault();
  const input = welcomeForm.querySelector("input");
  currentRoomName = input.value;

  await initCall();
  console.log("방 이름: " + input.value);

  socket.emit("join_room", input.value);
  input.value = "";

  initCall();
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

    cameras.forEach((camera) => {
      const option = document.createElement("option");
      option.value = camera.deviceId; // 유저 디바이스의 id
      option.innerText = camera.label;
      cameraSelect.appendChild(option);

      if (currentCamera?.label === camera.label) {
        console.log(currentCamera);
        option.selected = true;
      }
    });
  } catch (e) {
    console.log(e);
  }
};

/** 미디어 데이터를 출력합니다.
 * video#face에 navigator mediaDevices의 stream을 할당합니다.
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
    localFace.srcObject = localStream;

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
    console.log(peerConnection.getSenders());
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

socket.on("welcome", async () => {
  console.log("누군가 입장");
});

socket.on("offer", async (offer) => {
  peerConnection.setRemoteDescription(offer);

  const answer = await peerConnection.createAnswer();
  peerConnection.setLocalDescription(answer);

  socket.emit("answer", answer, currentRoomName);
});

socket.on("answer", (answer) => {
  peerConnection.setRemoteDescription(answer);
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
  remoteFace.srcObject = remoteStream;
};

/** 연결을 시도하는 곳에서 실행 */
const makeConnection = async () => {
  peerConnection = new RTCPeerConnection();
  peerConnection.addEventListener("icecandidate", handleIceCandidate);
  peerConnection.addEventListener("addstream", handleAddStream);
  localStream
    .getTracks()
    .forEach((track) => peerConnection.addTrack(track, localStream));

  const offer = await peerConnection.createOffer();
  peerConnection.setLocalDescription(offer);

  socket.emit("offer", offer, currentRoomName);
};
