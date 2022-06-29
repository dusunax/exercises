function emailCheck() {
  const email_el = document.querySelector('input[name="email"]');
  const email_wrong = document.querySelector(".email-wrong");
  email_el.addEventListener("focusout", function () {
    const value = email_el.value;
    if (value.indexOf("@") == -1) {
      email_wrong.innerHTML="올바른 메일 형식이 아닙니다."
      email_wrong.classList.remove('hidden')
    } else {
      email_wrong.innerHTML="";
      email_wrong.classList.add('hidden')
    }
  });
}
function pwCheck(){

}