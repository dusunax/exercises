const socket = io();

const face = document.querySelector("#face");
const muteBtn = document.querySelector("#mute");
const cameraBtn = document.querySelector("#camera");
const cameraSelect = document.querySelector("#cameraSelect");

let stream;
let isMuted = false;
let isCameraOff = false;

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
    const currentCamera = stream.getVideoTracks()[0];

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
    stream = await navigator.mediaDevices.getUserMedia(
      deviceId ? cameraConstrains : initialConstrains
    );
    face.srcObject = stream;

    if (!deviceId) {
      await getCameras();
    }

    // 카메라의 설정을 확인합니다.
    stream.getAudioTracks().forEach((track) => (track.enabled = !isMuted));
    stream.getVideoTracks().forEach((track) => (track.enabled = !isCameraOff));
  } catch (e) {
    console.log(e);
  }
};

getMedia();
getCameras();

// --------------------------------
// 이벤트 핸들러

const handleMuteClick = () => {
  stream.getAudioTracks().forEach((track) => (track.enabled = isMuted));
  isMuted = !isMuted;

  if (isMuted) {
    muteBtn.innerHTML = isMuted ? "음소거 해제" : "음소거";
  } else {
    muteBtn.innerHTML = "음소거";
  }
};

const handleCameraClick = () => {
  stream.getVideoTracks().forEach((track) => (track.enabled = isCameraOff));
  isCameraOff = !isCameraOff;

  if (isCameraOff) {
    cameraBtn.innerHTML = "카메라 켜기";
  } else {
    cameraBtn.innerHTML = "카메라 끄기";
  }
};

const handleCameraSelect = async () => {
  await getMedia(cameraSelect.value);
};

muteBtn.addEventListener("click", handleMuteClick);
cameraBtn.addEventListener("click", handleCameraClick);
cameraSelect.addEventListener("input", handleCameraSelect);
