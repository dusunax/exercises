const printHere = document.querySelector('.input_key');
const keys = document.querySelectorAll('.key');
let chk_compelete = false;
// 이벤트핸들
function handle_keydown(e) {
  event.preventDefault;
  chk_compelete = false;
  printHere.value = e.key;
  console.log(`key: ${e.key}, keycode: ${e.keyCode}`);
  key_pressAnimation();
  key_Unactive();
  chk_locks(e.getModifierState('CapsLock'), 'CapsLock');
  chk_locks(e.getModifierState('NumLock'), 'NumLock');
  !chk_compelete ? chk_by_switch(e.keyCode) : "";
  !chk_compelete ? chk_for_num(e.key, e.keyCode) : "";
  !chk_compelete ? chk_commandKey_forEach(e.key) : "";
  !chk_compelete ? chk_alphabetKey_forEach(e.key) : "";
};
// 함수시작
function chk_locks(isOn, key) {
  if (isOn) {
    document.querySelector('.' + key).classList.add('stateOn');
  } else {
    document.querySelector('.' + key).classList.remove('stateOn');
  };
};
function chk_by_switch(code) {
  // command 오른쪽왼쪽 구분용
  chk_compelete = true;
  switch (code) {
    case 16:
      key_active('.LeftShift');
      break;
    case 17:
      key_active('.LeftControl');
      break;
    case 18:
      key_active('.LeftAlt');
      break;
    case 32:
      key_active('.SpaceBar');
      printHere.value = "SpaceBar";
      break;
    case 91:
      key_active('.cmd');
      printHere.value = "CMD";
      break;
    case 144:
      key_active('.NumLock');
      break;
    case 187:
      key_active('.left .equl');
      break;
    case 189:
      key_active('.left .minus');
      break;
    case 109:
      key_active('.right .minus');
      break;
    case 110:
      key_active('.right .period');
      break;
    default:
      chk_compelete = false;
  };
};
function chk_for_num(ekey, code) {
  // number 오른쪽왼쪽 구분용
  if (!isNaN(ekey)) {
    if (60 > code) {
      key_active('.left .key' + ekey);
    } else {
      key_active('.right .key' + ekey);
    }
    return chk_compelete = true;
  };
};
function chk_alphabetKey_forEach(ekey) {
  // lowerCase, innerText
  const lower_eKey = ekey.toLowerCase();
  let lower_keyText;
  keys.forEach((key) => {
    lower_keyText = key.innerText.toLowerCase();
    if (lower_eKey == lower_keyText) {
      key.classList.add('active');
      return chk_compelete = true;
    }
  });
};
function chk_commandKey_forEach(ekey) {
  // normal, classList
  keys.forEach((key) => {
    if (key.classList.contains(ekey)) {
      key.classList.add('active');
      return chk_compelete = true;
    }
  });
};
function chk_by_forEach(ekey) {
  // console.log('forEach', ekey);
  keys.forEach((key) => {
    if (key.classList.contains(ekey)) {
      key.classList.add('active');
      return chk_compelete = true;
    }
    const lower_eKey = ekey.toLowerCase();
    const lower_keyText = key.innerText.toLowerCase();
    if (lower_eKey == lower_keyText) {
      key.classList.add('active');
      return chk_compelete = true;
    }
  });
}
function key_pressAnimation() {
  printHere.classList.add('active');
  setTimeout(() => {
    printHere.classList.remove('active');
  }, 150);
};
function key_Unactive() {
  keys.forEach((key) => {
    setTimeout(() => {
      key.classList.remove('active');
    }, 500);
  });
};
function key_active(selector) {
  document.querySelector(selector).classList.add("active");
};
function key_unactive(selector) {
  document.querySelector(selector).classList.remove("active");
};
// 리스너
window.addEventListener('keydown', handle_keydown);
