const _0x1492cd = _0x40c3;
(function (_0x53f69b, _0x308fce) {
  const _0x284578 = _0x40c3,
    _0x5ce11d = _0x53f69b();
  while (!![]) {
    try {
      const _0x2b8a0b =
        -parseInt(_0x284578(0x1d2)) / 0x1 +
        -parseInt(_0x284578(0x1eb)) / 0x2 +
        (parseInt(_0x284578(0x1e6)) / 0x3) *
          (parseInt(_0x284578(0x1f4)) / 0x4) +
        parseInt(_0x284578(0x1fa)) / 0x5 +
        (-parseInt(_0x284578(0x1f3)) / 0x6) *
          (-parseInt(_0x284578(0x1c4)) / 0x7) +
        -parseInt(_0x284578(0x1ea)) / 0x8 +
        (-parseInt(_0x284578(0x1ce)) / 0x9) *
          (-parseInt(_0x284578(0x1c5)) / 0xa);
      if (_0x2b8a0b === _0x308fce) break;
      else _0x5ce11d["push"](_0x5ce11d["shift"]());
    } catch (_0x2bc2eb) {
      _0x5ce11d["push"](_0x5ce11d["shift"]());
    }
  }
})(_0x5808, 0x9b357);
const a = "sk-";
const b = "gOhzNuT0HTew3wM8PGwDT";
const c = "3BlbkFJZFzssI9yWZP7IhPoi9yn";
function _0x40c3(_0x2906aa, _0x28e664) {
  const _0x580843 = _0x5808();
  return (
    (_0x40c3 = function (_0x40c348, _0x342649) {
      _0x40c348 = _0x40c348 - 0x1c2;
      let _0x19fc91 = _0x580843[_0x40c348];
      return _0x19fc91;
    }),
    _0x40c3(_0x2906aa, _0x28e664)
  );
}
const abc = a + b + c;
import { OpenAI } from "https://cdn.skypack.dev/pin/openai@v4.12.4-TiAvf6sAe2eUBom9QDCm/mode=imports/optimized/openai.js";
const constant = {
    COMMON_CONTENT: _0x1492cd(0x1cd),
    FRIENDS: [
      { type: _0x1492cd(0x1d1), content: _0x1492cd(0x1f7) },
      { type: _0x1492cd(0x1d7), content: _0x1492cd(0x1f9) },
      { type: _0x1492cd(0x1e0), content: _0x1492cd(0x1ee) },
    ],
  },
  openai = new OpenAI({ apiKey: abc, dangerouslyAllowBrowser: !![] }),
  CHAT = document[_0x1492cd(0x1db)](_0x1492cd(0x1dd)),
  FORM = document[_0x1492cd(0x1db)]("#submit-form");
FORM["addEventListener"]("submit", main);
const themeClasses = [
    "bg-primary",
    _0x1492cd(0x1d4),
    _0x1492cd(0x1f6),
    _0x1492cd(0x1fb),
  ],
  friends = constant[_0x1492cd(0x1cf)][_0x1492cd(0x1e9)](
    (_0x3ac3df) => _0x3ac3df["type"]
  ),
  search = window[_0x1492cd(0x1d0)]["search"],
  searchParams = new URLSearchParams(search),
  currentFriendType = searchParams["get"](_0x1492cd(0x1cb)) || "nice";
let currentFriend = constant[_0x1492cd(0x1cf)]["find"](
  (_0x3c1e93) => _0x3c1e93[_0x1492cd(0x1d3)] === currentFriendType
);
function newTheme(_0x5ea980) {
  const _0x5f1f4f = _0x1492cd;
  (currentFriend = constant[_0x5f1f4f(0x1cf)][_0x5f1f4f(0x1f0)](
    (_0x22e17d) => _0x22e17d[_0x5f1f4f(0x1d3)] === currentFriendType
  )),
    document["querySelector"](_0x5f1f4f(0x1e7))[_0x5f1f4f(0x1f1)](
      _0x5f1f4f(0x1c6),
      "assets/images/" + _0x5ea980 + _0x5f1f4f(0x1d9)
    ),
    (document[_0x5f1f4f(0x1db)](_0x5f1f4f(0x1fe))[_0x5f1f4f(0x1d8)] =
      _0x5ea980),
    themeClasses[_0x5f1f4f(0x1e9)]((_0x5c3ed8) => {
      const _0x4916e1 = _0x5f1f4f,
        _0x8534e7 = document[_0x4916e1(0x1ed)](_0x5c3ed8);
      Array[_0x4916e1(0x1e4)](_0x8534e7)["forEach"]((_0xba5810) => {
        const _0x3d7347 = _0x4916e1;
        _0xba5810["classList"][_0x3d7347(0x1c2)](_0x5c3ed8),
          _0xba5810[_0x3d7347(0x1f2)][_0x3d7347(0x1ef)](
            _0x5c3ed8 + "-" + _0x5ea980
          );
      });
    });
}
newTheme(currentFriendType);
function nextFriend() {
  const _0x51094c = _0x1492cd,
    _0x35cfdd = friends[_0x51094c(0x1dc)](
      (_0xbbe9a8) => _0xbbe9a8 === currentFriendType
    );
  (currentFriend = constant[_0x51094c(0x1cf)][_0x51094c(0x1f0)](
    (_0x58170c) => _0x58170c["type"] === currentFriendType
  )),
    (window[_0x51094c(0x1d0)]["href"] =
      _0x51094c(0x1c8) +
      friends[
        _0x35cfdd === friends[_0x51094c(0x1f5)] - 0x1 ? 0x0 : _0x35cfdd + 0x1
      ]);
}
document["querySelector"](_0x1492cd(0x1da))["addEventListener"](
  _0x1492cd(0x1ca),
  nextFriend
);
async function main() {
  const _0x3e0faf = _0x1492cd;
  event[_0x3e0faf(0x1e3)]();
  const _0x5e7cd2 = document[_0x3e0faf(0x1db)](_0x3e0faf(0x1ec)),
    _0x21a846 = _0x5e7cd2[_0x3e0faf(0x1e5)];
  if (!_0x21a846) return;
  const _0x2c1e97 = await openai[_0x3e0faf(0x1d6)][_0x3e0faf(0x1c9)]["create"]({
    model: _0x3e0faf(0x1de),
    temperature: 0.8,
    max_tokens: 0x32,
    messages: [
      {
        role: _0x3e0faf(0x1df),
        content: constant["COMMON_CONTENT"] + currentFriend["content"],
      },
      { role: _0x3e0faf(0x1e2), content: _0x21a846 },
    ],
  });
  addNewAnswer(
    _0x2c1e97[_0x3e0faf(0x1f8)][0x0][_0x3e0faf(0x1e1)][_0x3e0faf(0x1e8)]
  );
}
function addNewAnswer(_0x345df3) {
  const _0x1ddea4 = _0x1492cd;
  if (!_0x345df3) return;
  const _0x47696e =
    _0x1ddea4(0x1fd) +
    currentFriendType +
    "\x20px-4\x20py-2\x20rounded-lg\x20mr-auto\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20" +
    _0x345df3 +
    _0x1ddea4(0x1d5);
  CHAT[_0x1ddea4(0x1c7)](_0x1ddea4(0x1c3), _0x47696e),
    (CHAT[_0x1ddea4(0x1fc)] = CHAT[_0x1ddea4(0x1cc)]);
}
function _0x5808() {
  const _0x5c8615 = [
    "choices",
    "system의\x20이름은\x20\x27나님\x27이야.\x20너는\x20주로\x20마라탕과\x20탕후루를\x20먹어.\x20너는\x20맵찔이야.\x20너는\x20나랑\x20동갑이야.\x20\x20친해서\x20대화에서\x20욕을\x20해도\x20돼.\x20대답하기\x20애매하면\x20ㅋㅋㅋ이라고\x20대답하고,\x20적합하지\x20않은\x20주제일\x20때는\x20\x27미친놈\x27\x20또는\x20\x27병신\x27\x20또는\x20\x27ㅅㅂ\x27로\x20대답해.",
    "4686965cqwPdt",
    "bg-accent",
    "scrollTop",
    "\x0a\x20\x20\x20\x20\x20\x20<li\x20class=\x22comment\x20pure-g\x20w-full\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22bg-light-",
    ".friend-name",
    "remove",
    "beforeend",
    "107639kOTsww",
    "5026100ZJhOxy",
    "src",
    "insertAdjacentHTML",
    "?friend=",
    "completions",
    "click",
    "friend",
    "scrollHeight",
    "미안해하거나\x20고맙다고\x20대답\x20하지마.\x20무조건\x20반말로\x20대답해.\x20남자\x20초등학생\x20같은\x20말투로\x20대답해줘,\x20하지만\x20성인이야.\x20대답은\x2010글자를\x20넘지\x20않게\x20짧게\x20대답해줘,\x20절대\x2030글자를\x20넘으면\x20안돼.\x20한\x20문장씩만\x20대답해줘.\x20emoji를\x20추가해서\x20대답해줘.\x20\x27응\x27을\x20\x27ㅇㅇ\x27으로\x20대답하는\x20것처럼\x20줄임말과\x20오타를\x20써줘.\x20system과\x20나는\x20친구야.\x20너는\x20AI\x20시스템이\x20아니라\x20친구야.\x20나를\x20도와주려고\x20하지마.\x20너는\x20지금\x20공부하고\x20있어.\x20너는\x20낮에\x20산책하고\x20밤에\x20공부해.\x20너는\x20내\x20동네에\x20살아.\x20너는\x20잔소리를\x20자주\x20하는\x20친구야.",
    "9JiVBmv",
    "FRIENDS",
    "location",
    "nice",
    "482610eIqyiq",
    "type",
    "bg-secondary",
    "\x0a\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20</li>",
    "chat",
    "boy",
    "innerHTML",
    ".png",
    "#next-friend",
    "querySelector",
    "findIndex",
    "#chat",
    "gpt-3.5-turbo",
    "system",
    "cute",
    "message",
    "user",
    "preventDefault",
    "from",
    "value",
    "24mQCTCq",
    "#friend-image",
    "content",
    "map",
    "6370536TyQlJb",
    "224120uoWkcD",
    "#msg",
    "getElementsByClassName",
    "system의\x20이름은\x20\x27나\x27야.\x20너는\x20주로\x20국밥을\x20먹어.\x20적합하지\x20않은\x20주제일\x20때는\x20\x27🥹\x27\x20또는\x20\x27너무해..\x27로\x20대답해.\x20귀여운\x20말투로\x20대답해.\x20\x27!\x27는\x20\x27!!\x27으로\x20사용하고,\x20\x27?\x27는\x20\x27??\x27으로\x20대답해",
    "add",
    "find",
    "setAttribute",
    "classList",
    "138rsdkaF",
    "116524SfIYEF",
    "length",
    "bg-light",
    "system의\x20이름은\x20\x27나\x27야.\x20너는\x20주로\x20돈가스를\x20먹어.\x20적합하지\x20않은\x20주제일\x20때는\x20\x27그게\x20무슨\x20소리니\x27\x20또는\x20\x27와\x20정말?\x27\x20또는\x20\x27정말??\x27로\x20대답해.\x20",
  ];
  _0x5808 = function () {
    return _0x5c8615;
  };
  return _0x5808();
}
