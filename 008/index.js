const printHere = document.querySelector('.input_key');
const keys = document.querySelectorAll('.key');
let chk_compelete=false;
// 이벤트핸들
function handle_keydown(e) {
  // 확인용 console.log(e.keyCode)
  event.preventDefault;
  key_pressAnimation();
  printHere.value = e.key;
  chk_compelete=false;
  chk_compelete=chk_by_switch(e.keyCode);
  if(!chk_compelete){
    chk_by_forEach(e.key)
  }
}
// 함수시작
function chk_by_switch(code){
  // 확인용 console.log('switch', code);
  switch (code) {
    case 32:
      document.querySelector('.SpaceBar').classList.add('active');
      key_Unactive();
      printHere.value = "SpaceBar";
      return chk_compelete=true;
    case 9:
      document.querySelector('.Tab').classList.add('active');
      key_Unactive();
      return chk_compelete=true;
    case 16:
      document.querySelector('.LeftShift').classList.add('active');
      key_Unactive();
      return chk_compelete=true;
    case 18:
      document.querySelector('.LeftAlt').classList.add('active');
      key_Unactive();
      return chk_compelete=true;
    case 17:
      document.querySelector('.LeftControl').classList.add('active');
      key_Unactive();
      return chk_compelete=true;
    case 20:
      document.querySelector('.CapsLock').classList.add('active');
      key_Unactive();
      return chk_compelete=true;
    case 91:
      document.querySelector('.cmd').classList.add('active');
      key_Unactive();
      printHere.value = "CMD";
      return chk_compelete=true;
    case 144:
      document.querySelector('.NumLk').classList.add('active');
      key_Unactive();
      return chk_compelete=true;
    default:
  };
}
function chk_by_forEach(ekey){
  console.log('forEach', ekey);
  keys.forEach((key) => {
    key_Unactive();
    const lower_eKey = ekey.toLowerCase();
    const lower_keyText = key.innerText.toLowerCase();
    if (lower_eKey == lower_keyText) {
      key.classList.add('active');
      return;
    } else if (key.classList.contains(lower_eKey)) {
      key.classList.add('active');
      return;
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
