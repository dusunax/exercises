// api
const baseUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/`;

// html elements => 나중에 리액트로
const newPokemonBox = document.querySelector(".new-poketmon");

const setNewPokemon = ({ name, img }) => {
  console.log(newPokemonBox.querySelector(".name"));
  newPokemonBox.querySelector(".name").innerHTML = name;
  newPokemonBox.querySelector(".img img").setAttribute("src", img);
};

const savedPokemons = [];

// time => db에서 받아오는 값 : lastUpdated
let lastUpdated = new Date("Feb 3, 2023 23:00:00");
const oneHour = 60 * 60 * 1000;

document.getElementById(
  "lastUpdated"
).innerHTML = `마지막 뽑은 시간: ${lastUpdated.toLocaleTimeString()}`;

function fetchLastUpdated() {
  const isEnableToDraw =
    new Date().getTime() - lastUpdated.getTime() >= oneHour;

  console.log(isEnableToDraw);
}

// 뽑기
function drawHandler() {
  const poketmonObj = generateNewPokemon();
  setNewPokemon(poketmonObj);
  savePokemons(poketmonObj);
}

function savePokemons(poketmonObj) {
  savedPokemons.unshift(poketmonObj);

  document.querySelector(".saved-poketmon").innerHTML = "";
  const newUl = document.createElement("ul");

  savedPokemons.map((eachPokemon, idx) => {
    if (idx === 0) return;
    const newList = document.createElement("li");
    newList.innerHTML = `<div class="poketmon">
      <div class="name">${eachPokemon.name}</div>
      <div class="img">
        <img src=${eachPokemon.img} alt="포켓몬" />
      </div>
    </div>`;
    newUl.appendChild(newList);
  });

  document.querySelector(".saved-poketmon").appendChild(newUl);
}

// 새 포켓몬
function generateNewPokemon() {
  const num = parseInt(Math.random() * 800);
  const imageUrl = baseUrl + `${num}.png`;

  return { img: imageUrl, name: "newPokemon" };
}

// 타이머
var targetDate = lastUpdated.getTime();

var x = setInterval(function () {
  var now = new Date().getTime();
  var exp = targetDate + oneHour - now;
  var iat = now - lastUpdated;

  console.log(targetDate, lastUpdated);

  const expTimer = getTimerString(exp);
  const iatTimer = getTimerString(iat);

  document.getElementById(
    "countDown"
  ).innerHTML = `다시 뽑을 수 있는 시간: ${expTimer}`;

  document.getElementById(
    "countUp"
  ).innerHTML = `마지막 뽑은 시간에서부터: ${iatTimer}`;

  if (exp < 0) {
    clearInterval(x);
    document.getElementById("countDown").innerHTML = "렛츠고";
  }
}, 1000);

function getTimerString(timeDistance) {
  var days = Math.floor(timeDistance / (1000 * 60 * 60 * 24));
  var hours = Math.floor(
    (timeDistance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  var minutes = Math.floor((timeDistance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((timeDistance % (1000 * 60)) / 1000);

  return `${days}:${hours}:${minutes}:${seconds}`;
}
