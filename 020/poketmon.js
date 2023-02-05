// api
const baseImgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/`;
const baseNameUrl = `https://pokeapi.co/api/v2/pokemon-species/`;

// html elements => 나중에 리액트로
const newPokemonBox = document.querySelector(".new-pokemon");

const setNewPokemon = ({ names, img }) => {
  newPokemonBox.querySelector(".name").innerHTML = names[2].name;
  newPokemonBox.querySelector(".img img").setAttribute("src", img);
};

const fetchpokemon = async (url) => {
  try {
    let response = await fetch(url);
    let data = await response.json();

    return generateNewPokemon(data);
  } catch (error) {
    console.log(error);
  }
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
async function drawHandler() {
  const id = parseInt(Math.random() * 800);
  const pokemonObj = await fetchpokemon(`${baseNameUrl}${id}`);

  setNewPokemon(pokemonObj);
  savePokemons(pokemonObj);
}

function savePokemons(pokemonObj) {
  savedPokemons.unshift(pokemonObj);

  document.querySelector(".saved-pokemon").innerHTML = "";
  const newUl = document.createElement("ul");

  savedPokemons.map((eachPokemon, idx) => {
    if (idx === 0) return;
    const newList = document.createElement("li");
    newList.innerHTML = `<div class="pokemon">
      <div class="name">${eachPokemon.names[2].name}</div>
      <div class="img">
        <img src=${eachPokemon.img} alt="포켓몬" />
      </div>
    </div>`;
    newUl.appendChild(newList);
  });

  document.querySelector(".saved-pokemon").appendChild(newUl);
}

// 새 포켓몬
function generateNewPokemon(data) {
  const imageUrl = baseImgUrl + `${data.id}.png`;

  return { ...data, img: imageUrl };
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
