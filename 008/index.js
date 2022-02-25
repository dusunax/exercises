const printHere = document.querySelector('.input_key');
const keys = document.querySelectorAll('.key');
let chk_compelete=false;
// 이벤트핸들
function handle_keydown(e) {
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
    chk_by_forEach(e.key);
  }
  if(!chk_compelete){
    chk_compelete=chk_by_switch(e.keyCode);
    chk_compelete=true;
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
    case 16:
      document.querySelector('.LeftShift').classList.add('active');
      break;
    case 18:
      document.querySelector('.LeftAlt').classList.add('active');
      break;
    case 17:
      document.querySelector('.LeftControl').classList.add('active');
      break;
    case 20:
      document.querySelector('.CapsLock').classList.add('active');
      break;
    case 91:
      document.querySelector('.cmd').classList.add('active');
      printHere.value = "CMD";
      break;
    case 144:
      document.querySelector('.NumLk').classList.add('active');
    default:
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
