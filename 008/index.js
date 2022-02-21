  const printHere = document.querySelector('.input_key');
  const keys = document.querySelectorAll('.key');
  function handle_keydown(e) {
    // 확인용 console.log(e.keyCode)
    printHere.value=e.key;
    switch (e.keyCode) {
      case 32:
        document.querySelector('.SpaceBar').classList.add('active');
        key_Unactive();
        printHere.value="SpaceBar";
        return;
      case 4:
        document.querySelector('.LeftShift').classList.add('active');
        key_Unactive();
        return;
      case 18:
        document.querySelector('.LeftAlt').classList.add('active');
        key_Unactive();
        return;
      case 17:
        document.querySelector('.LeftControl').classList.add('active');
        key_Unactive();
        return;
      case 91:
        document.querySelector('.cmd').classList.add('active');
        key_Unactive();
        printHere.value="CMD";
        return;
      default:
    };
    keys.forEach((key) => {
      key_Unactive();
      if (e.key == key.innerText) {
        key.classList.add('active');
        return;
      } else if (key.classList.contains(e.key)) {
        key.classList.add('active');
        return;
      }
    });
  }
  function key_Unactive() {
    keys.forEach((key) => {
      setTimeout(() => {
        key.classList.remove('active');
      }, 500);
    });
  }
  window.addEventListener('keydown', handle_keydown);
