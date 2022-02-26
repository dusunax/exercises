const printHere = document.querySelector('.input_key');
const keys = document.querySelectorAll('.key');
let chk_compelete=false;
// 이벤트핸들
function handle_keydown(e) {
  if(e.getModifierState('CapsLock')){
    document.querySelector('.CapsLock').classList.add('stateOn');
  } else {
    document.querySelector('.CapsLock').classList.remove('stateOn');
  }
  if(e.getModifierState('NumLock')){
    document.querySelector('.NumLock').classList.add('stateOn');
  } else {
    document.querySelector('.NumLock').classList.remove('stateOn');
  }
  // 확인용 console.log(e.keyCode)
  console.log(`key: ${e.key}, keycode: ${e.keyCode}`);
  event.preventDefault;
  key_pressAnimation();
  printHere.value = e.key;
  chk_compelete=false;
  if(e.keyCode == 67){
    document.querySelector('.c').classList.add('active');
    printHere.value = "c";
    return;
  }
  if(!chk_compelete){
    chk_for_num(e.key, e.keyCode);
  }
  if(!chk_compelete){
    chk_compelete=true;
    chk_by_switch(e.keyCode);
  }
  if(!chk_compelete){
    chk_by_forEach(e.key);
  }
  key_Unactive();
}
// 함수시작
function chk_by_switch(code){
  // 확인용 console.log('switch', code);
  switch (code) {
    case 32:
      document.querySelector('.SpaceBar').classList.add('active');
      printHere.value = "SpaceBar";
      break;
    case 9:
      document.querySelector('.Tab').classList.add('active');
      break;
    case 21:
      document.querySelector('.HangulMode').classList.add('active');
      break;
    case 16:
      document.querySelector('.LeftShift').classList.add('active');
      break;
    case 18:
      document.querySelector('.LeftAlt').classList.add('active');
      break;
    case 17:
      document.querySelector('.LeftControl').classList.add('active');
      break;
    case 91:
      document.querySelector('.cmd').classList.add('active');
      printHere.value = "CMD";
      break;
    case 144:
      document.querySelector('.NumLock').classList.add('active');
      break;
    // 화살표
    case 38:
      document.querySelector('.ArrowUp').classList.add('active');
      break;
    case 40:
      document.querySelector('.ArrowDown').classList.add('active');
      break;
    case 37:
      document.querySelector('.ArrowLeft').classList.add('active');
      break;
    case 39:
      document.querySelector('.ArrowRight').classList.add('active');
      break;
    // 넘버패드 오른쪽
    case 20:
      document.querySelector('.CapsLock').classList.add('active');
      break;
    case 187:
      document.querySelector('.left .equl').classList.add('active');
      break;
    case 189:
      document.querySelector('.left .minus').classList.add('active');
      break;
    case 109:
      document.querySelector('.right .minus').classList.add('active');
      break;
    case 109:
      document.querySelector('.right .minus').classList.add('active');
      break;
    default:
      chk_compelete=false;
  };
}
function chk_for_num(ekey, code){
  if(!isNaN(ekey)){
    if(60>code){
      document.querySelector('.left .key'+ekey).classList.add('active');
    } else {
      document.querySelector('.right .key'+ekey).classList.add('active');
    }
    return chk_compelete=true;
  };
}
function chk_by_forEach(ekey){
  // console.log('forEach', ekey);
  keys.forEach((key) => {
    const lower_eKey = ekey.toLowerCase();
    const lower_keyText = key.innerText.toLowerCase();
    if (lower_eKey == lower_keyText) {
      key.classList.add('active');
      return chk_compelete=true;
    } else if (key.classList.contains(lower_eKey)) {
      key.classList.add('active');
      return chk_compelete=true;
    }
  });
}
function key_pressAnimation() {
    printHere.classList.add('active');
    setTimeout(() => {
      printHere.classList.remove('active');
    }, 150)
}
function key_Unactive() {
  keys.forEach((key) => {
    setTimeout(() => {
      key.classList.remove('active');
    }, 500);
  });
}
// 리스너
window.addEventListener('keydown', handle_keydown);
