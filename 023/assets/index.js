// Constants
const tempNicknameInput = document.querySelector("#temp-nickname");
const tempAgeInput = document.querySelector("#temp-age");
const nicknameInput = document.querySelector("#nickname");
const ageInput = document.querySelector("#age");
const nicknames = document.querySelectorAll("strong.nickname");
const ages = document.querySelectorAll("strong.age");
const ageArea = document.querySelector(".age-area");
const progressBar = document.querySelector(".progress");

const setHeight = () => {
  const body = document.querySelector("body");
  const vh = window.innerHeight * 0.01;
  body.style.height = `${vh}px`;
};

window.addEventListener("resize", setHeight);
setHeight();

/**
 * [유저 저장 및 step 이동]
 * - step 1 => 2
 * - 현재 입력된 닉네임과 나이를 임시 저장하고, 각 닉네임과 나이 엘리먼트에 값을 넣어줍니다.
 */
const saveUserAndGoNext = () => {
  tempNicknameInput.value = nicknameInput.value;
  tempAgeInput.value = ageInput.value;

  // 다음 페이지로 이동합니다.
  window.location.hash = "step-two";

  nicknames.forEach((e) => (e.innerText = tempNicknameInput.value));
  ages.forEach((e) => (e.innerText = tempAgeInput.value));
};

/** 입력받은 다음 hash로 이동하는 함수 */
const goToNextStep = (nextHash) => {
  window.location.hash = nextHash;
};

/** 인사말을 띄우는 함수 */
const seeYouLater = () => {
  alert("다음에 만나요!👩‍🏭");
};

// step2: age 프로그래스바 이벤트 리스너 ------------------
const handleAgeInput = () => {
  const age = parseInt(ageInput.value);
  const progress = age + "%";
  progressBar.style.width = progress;
};

const handleMouseMove = (e) => {
  const age = Math.round((e.offsetX / ageArea.offsetWidth) * 100);
  const progress = age + "%";

  progressBar.style.width = progress;
  ageInput.value = age;

  const rotate = (age - 50) * 1.8; // 각도 계산
  progressBar.parentElement.style.transform = `rotate(${rotate}deg)`; // transform 적용
};

// 이벤트 리스너를 등록합니다.
window.addEventListener("DOMContentLoaded", () => {
  ageInput.addEventListener("input", handleAgeInput);
  ageArea.addEventListener("mousemove", handleMouseMove);
});
