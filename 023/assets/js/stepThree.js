// step3: age 프로그래스바 이벤트 리스너 ------------------

// 프로그래스바
const progressContainerWidth = document.querySelector(
  "#step-three .progress-container"
).offsetWidth;
let progressPercentage = 0;
const maxYear = new Date().getFullYear();

/** [throttled] 육십갑자 계산 후 결과를 화면에 출력 */
const throttledShowResult = throttle(showResult, 500);
function showResult() {
  const currentFullYear =
    Math.round((progressPercentage / 100) * (maxYear - 1923)) + 1923;
  if (isNaN(currentFullYear)) return;

  // 육십갑자 계산
  const result = getYearHandler(currentFullYear);
  updateEmojiBranch(result.branchResult, result.emojiBranchResult);

  // 결과 출력
  resultThree.innerHTML = result.textResult;
  resultThree.classList.add("fade-in");
  updateUserNameAndAge("", maxYear - currentFullYear);
}

/** 화면에 나타나는 육십갑자를 업데이트합니다. */
function updateEmojiBranch(newBranch, newEmojiBranch) {
  if (newBranch) {
    branchs.forEach((e) => (e.innerText = newBranch));
    tempBranch.value = newBranch;
  }

  if (newEmojiBranch) {
    branchEmojis.forEach((e) => (e.innerText = newEmojiBranch));
  }
}

/** 화면에 나타나는 생년을 업데이트합니다. */
function updateBirthYear(number) {
  const currentYear =
    Math.round((progressPercentage / 100) * (maxYear - 1923)) + 1923;

  birthNumber.innerText = number || currentYear;
}

/** 화면에 나타나는 프로그래스바를 업데이트 합니다/ */
const setProgressBar = (percentage) => {
  progressBarThree.style.width = `${percentage}%`;
};

/** 프로그래스바 핸들러 */
const mouseMoveProgressBarHandler = (event) => {
  const mousePosition = event.clientX;
  const progressContainerLeft = document
    .querySelector("#step-three .progress-container")
    .getBoundingClientRect().left;

  const progressBarWidth = (progressContainerWidth * progressPercentage) / 100;
  const progressBarLeft = progressContainerLeft + progressBarWidth;

  if (mousePosition > progressBarLeft) {
    progressPercentage += 1;
  } else if (mousePosition < progressBarLeft) {
    progressPercentage -= 1;
  }

  if (progressPercentage < 0) {
    progressPercentage = 0;
  } else if (progressPercentage > 100) {
    progressPercentage = 100;
  }

  setProgressBar(progressPercentage);
  updateBirthYear();
  resultThree.classList.remove("fade-in");
  throttledShowResult();
};

document
  .querySelector("#step-three .progress-container")
  .addEventListener("mousemove", mouseMoveProgressBarHandler);
