const saveUserAndGoNext = () => {
  const tempNicknameInput = document.querySelector("#temp-nickname");
  const tempAgeInput = document.querySelector("#temp-age");
  const nicknameInput = document.querySelector("#nickname");
  const ageInput = document.querySelector("#age");
  const nicknames = document.querySelectorAll("strong.nickname");
  const ages = document.querySelectorAll("strong.age");

  tempNicknameInput.value = nicknameInput.value;
  tempAgeInput.value = ageInput.value;

  // 다음 페이지로 이동
  window.location.hash = "step-two";

  nicknames.forEach((e) => {
    e.innerText = document.querySelector("#temp-nickname").value;
    console.log(e);
  });
  ages.forEach((e) => {
    e.innerText = document.querySelector("#temp-age").value;
    console.log(e);
  });
};

window.addEventListener("DOMContentLoaded", () => {
  const ageInput = document.getElementById("age");
  const progressBar = document.querySelector(".progress");
  const ageArea = document.querySelector(".age-area");

  ageInput.addEventListener("input", () => {
    const age = parseInt(ageInput.value);
    const progress = age + "%";
    progressBar.style.width = progress;
  });

  ageArea.addEventListener("mousemove", (e) => {
    const age = Math.round((e.offsetX / ageArea.offsetWidth) * 100);
    const progress = age + "%";
    progressBar.style.width = progress;
    ageInput.value = age;
    const rotate = (age - 50) * 1.8; // 각도 계산
    progressBar.parentElement.style.transform = `rotate(${rotate}deg)`; // transform 적용
  });
});
