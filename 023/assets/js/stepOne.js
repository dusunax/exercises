/**
 * [step 1, input value 저장 및 step 이동]
 * - 현재 입력된 닉네임과 나이를 임시 저장하고, 각 닉네임과 나이 엘리먼트에 값을 넣어줍니다.
 * - step 1에서 step 2로 이동합니다.
 */
const saveUserAndGoNext = () => {
  const newNickName = nicknameInput.value;
  const newAge = ageInput.value;

  updateUserNameAndAge(newNickName, newAge);

  // 다음 hash로 이동합니다.
  window.location.hash = "step-two";

  updateBirthYear(new Date().getFullYear() - ageInput.value);
  setProgressBar(ageInput.value);
};

/** 유저 이름과 나이를 각 인풋과 textContent에 업데이트 합니다. */
const updateUserNameAndAge = (newNickName, newAge) => {
  if (newNickName) {
    nicknames.forEach((e) => (e.innerText = newNickName));
    tempNicknameInput.value = newNickName;
  }

  if (newAge) {
    ages.forEach((e) => (e.innerText = newAge));
    tempAgeInput.value = newAge;

    setStepOneValueOnTempAgeChange(newAge);
    setStepTwoValueOnTempAgeChange(newAge);
  }
};

const handleAgeInput = () => {
  const age = parseInt(ageInput.value);
  const progress = age + "%";
  progressBarOne.style.width = progress;
};

const handleMouseMove = (e) => {
  const age = Math.round((e.offsetX / ageArea.offsetWidth) * 100);
  const progress = age + "%";

  progressBarOne.style.width = progress;
  ageInput.value = age;

  const rotate = (age - 50) * 1.8; // 각도 계산
  progressBarOne.parentElement.style.transform = `rotate(${rotate}deg)`; // transform 적용
};

/** 프로그래스바를 업데이트합니다. */
const setStepOneValueOnTempAgeChange = (age) => {
  const progress = age + "%";

  progressBarOne.style.width = progress;
  ageInput.value = age;
};

// 이벤트 리스너를 등록합니다.
window.addEventListener("DOMContentLoaded", () => {
  ageInput.addEventListener("input", handleAgeInput);
  ageArea.addEventListener("mousemove", handleMouseMove);
});
