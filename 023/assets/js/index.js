/** 높이를 설정합니다.(모바일) */
const setHeight = () => {
  const body = document.querySelector("body");
  const vh = window.innerHeight * 0.01;
  body.style.height = `${vh}px`;
};

window.addEventListener("resize", setHeight);
setHeight();

/** throttle 쓰로틀링
 * 1. stepThree의 결과값 출력 시, throttle 사용
 */
function throttle(callback, delay) {
  let timeoutId = null;
  return function (...args) {
    if (!timeoutId) {
      timeoutId = setTimeout(() => {
        callback.apply(this, args);
        timeoutId = null;
      }, delay);
    }
  };
}

/** 입력받은 다음 hash로 이동하는 함수 */
const goToNextStep = (nextHash) => {
  window.location.hash = nextHash;
};

/** 인사말을 띄우는 함수 */
const seeYouLater = () => {
  alert("다음에 만나요!👩‍🏭");
};
