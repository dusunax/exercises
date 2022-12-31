const app = document.querySelector("#app");
const button = document.querySelector("button");
const warings = document.querySelectorAll(".waring");

let count = 0;
let message = "버튼을 누르지 마세요. ";

button.addEventListener("click", () => {
  ++count;

  if (count > 0) {
    app.classList.toggle("active");
  }

  if (count > 0 && count % 5 === 0) {
    app.classList.add("accent");
    message = "please wait... ";
  } else {
    if (app.classList.contains("accent")) {
      app.classList.remove("accent");
      message = "버튼을 누르지 마세요. ";
    }
  }
});

warings.forEach((w) => {
  w.addEventListener("click", () => {
    app.classList.toggle("active");

    if (!app.classList.contains("active")) {
      alert(message.repeat(count + 1));

      for (let i = 0; i < count + 1; i++) {
        console.log(message.repeat(i + 1));
      }
    } else {
      confirm(message);
      if (count > 0) {
        alert("당신이 반복한 횟수 : " + count);
      }

      for (let i = 0; i < count + 1; i++) {
        console.log(message.repeat(i + 1));
      }
    }
  });
});
