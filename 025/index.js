const _0x4e0d1d = _0x30d8;
(function (_0x22017d, _0x5cac49) {
  const _0x57d544 = _0x30d8,
    _0x5e3092 = _0x22017d();
  while (!![]) {
    try {
      const _0x149406 =
        parseInt(_0x57d544(0xa0)) / 0x1 +
        parseInt(_0x57d544(0x94)) / 0x2 +
        (parseInt(_0x57d544(0xb5)) / 0x3) * (parseInt(_0x57d544(0xa4)) / 0x4) +
        parseInt(_0x57d544(0xb0)) / 0x5 +
        -parseInt(_0x57d544(0x8f)) / 0x6 +
        (-parseInt(_0x57d544(0xa7)) / 0x7) *
          (-parseInt(_0x57d544(0x9d)) / 0x8) +
        -parseInt(_0x57d544(0xa2)) / 0x9;
      if (_0x149406 === _0x5cac49) break;
      else _0x5e3092["push"](_0x5e3092["shift"]());
    } catch (_0xbbd963) {
      _0x5e3092["push"](_0x5e3092["shift"]());
    }
  }
})(_0x13e8, 0xedf87);
const a = "sk-";
const b = "gOhzNuT0HTew3wM8PGwDT";
const c = "3BlbkFJZFzssI9yWZP7IhPoi9yn";
import { OpenAI } from "https://cdn.skypack.dev/pin/openai@v4.12.4-TiAvf6sAe2eUBom9QDCm/mode=imports/optimized/openai.js";
const abc = a + b + c;
const CONSTANT = {
    COMMON_CONTENT:
      "미안해하거나\x20고맙다고\x20대답\x20하지마.\x20무조건\x20반말로\x20대답해.\x20남자\x20초등학생\x20같은\x20말투로\x20대답해줘,\x20하지만\x20성인이야.\x20대답은\x2010글자를\x20넘지\x20않게\x20짧게\x20대답해줘,\x20절대\x2030글자를\x20넘으면\x20안돼.\x20한\x20문장씩만\x20대답해줘.\x20emoji를\x20추가해서\x20대답해줘.\x20\x27응\x27을\x20\x27ㅇㅇ\x27으로\x20대답하는\x20것처럼\x20줄임말과\x20오타를\x20써줘.\x20system과\x20나는\x20친구야.\x20너는\x20AI\x20시스템이\x20아니라\x20친구야.\x20나를\x20도와주려고\x20하지마.\x20너는\x20지금\x20공부하고\x20있어.\x20너는\x20낮에\x20산책하고\x20밤에\x20공부해.\x20너는\x20내\x20동네에\x20살아.\x20너는\x20잔소리를\x20자주\x20하는\x20친구야.",
    FRIENDS: [
      { type: "boy", content: _0x4e0d1d(0xab) },
      { type: _0x4e0d1d(0xa9), content: _0x4e0d1d(0x96) },
      { type: "nice", content: _0x4e0d1d(0xbb) },
    ],
  },
  openai = new OpenAI({ apiKey: abc, dangerouslyAllowBrowser: !![] }),
  CHAT = document[_0x4e0d1d(0xb6)](_0x4e0d1d(0xa5)),
  FORM = document[_0x4e0d1d(0xb6)](_0x4e0d1d(0xbe));
FORM[_0x4e0d1d(0x9e)]("submit", main);
const themeClasses = [
    _0x4e0d1d(0x93),
    "bg-secondary",
    _0x4e0d1d(0xb9),
    "bg-accent",
  ],
  friends = CONSTANT[_0x4e0d1d(0x9b)]["map"](
    (_0x2d9acd) => _0x2d9acd[_0x4e0d1d(0x90)]
  ),
  search = window[_0x4e0d1d(0x9c)][_0x4e0d1d(0xa8)],
  searchParams = new URLSearchParams(search),
  currentFriendType =
    searchParams[_0x4e0d1d(0x9f)]("friend") ||
    CONSTANT[_0x4e0d1d(0x9b)][0x0][_0x4e0d1d(0x90)];
let currentFriend = CONSTANT[_0x4e0d1d(0x9b)][_0x4e0d1d(0xac)](
  (_0x16f9be) => _0x16f9be["type"] === currentFriendType
);
function newTheme(_0x4d1340) {
  const _0x143381 = _0x4e0d1d;
  (currentFriend = CONSTANT["FRIENDS"][_0x143381(0xac)](
    (_0x45f965) => _0x45f965["type"] === currentFriendType
  )),
    document["querySelector"](_0x143381(0xbf))[_0x143381(0x92)](
      _0x143381(0xad),
      _0x143381(0x99) + _0x4d1340 + _0x143381(0xb7)
    ),
    (document["querySelector"](".friend-name")["innerHTML"] = _0x4d1340),
    themeClasses["map"]((_0x26892d) => {
      const _0x486cce = _0x143381,
        _0x5635d4 = document[_0x486cce(0xba)](_0x26892d);
      Array[_0x486cce(0xc1)](_0x5635d4)["forEach"]((_0x32ad1a) => {
        const _0x309037 = _0x486cce;
        _0x32ad1a[_0x309037(0xb8)]["remove"](_0x26892d),
          _0x32ad1a["classList"]["add"](_0x26892d + "-" + _0x4d1340);
      });
    });
}
newTheme(currentFriendType);
function _0x13e8() {
  const _0x45e7ae = [
    "search",
    "cute",
    "choices",
    "system의\x20이름은\x20\x27나님\x27이야.\x20너는\x20주로\x20마라탕과\x20탕후루를\x20먹어.\x20너는\x20맵찔이야.\x20너는\x20나랑\x20동갑이야.\x20\x20친해서\x20대화에서\x20욕을\x20해도\x20돼.\x20대답하기\x20애매하면\x20ㅋㅋㅋ이라고\x20대답하고,\x20적합하지\x20않은\x20주제일\x20때는\x20\x27미친놈\x27\x20또는\x20\x27병신\x27\x20또는\x20\x27ㅅㅂ\x27로\x20대답해.",
    "find",
    "src",
    "beforeend",
    "?friend=",
    "1250040nLhPLb",
    "preventDefault",
    "href",
    "insertAdjacentHTML",
    "create",
    "60549FqtLEd",
    "querySelector",
    ".png",
    "classList",
    "bg-light",
    "getElementsByClassName",
    "system의\x20이름은\x20\x27나\x27야.\x20너는\x20주로\x20돈가스를\x20먹어.\x20적합하지\x20않은\x20주제일\x20때는\x20\x27그게\x20무슨\x20소리니\x27\x20또는\x20\x27와\x20정말?\x27\x20또는\x20\x27정말??\x27로\x20대답해.\x20",
    "user",
    "scrollHeight",
    "#submit-form",
    "#friend-image",
    "scrollTop",
    "from",
    "4188996tPZOUb",
    "type",
    "COMMON_CONTENT",
    "setAttribute",
    "bg-primary",
    "90660TJSzOE",
    "content",
    "system의\x20이름은\x20\x27나\x27야.\x20너는\x20주로\x20국밥을\x20먹어.\x20적합하지\x20않은\x20주제일\x20때는\x20\x27🥹\x27\x20또는\x20\x27너무해..\x27로\x20대답해.\x20귀여운\x20말투로\x20대답해.\x20\x27!\x27는\x20\x27!!\x27으로\x20사용하고,\x20\x27?\x27는\x20\x27??\x27으로\x20대답해",
    "value",
    "#next-friend",
    "assets/images/",
    "chat",
    "FRIENDS",
    "location",
    "5912YzfDdZ",
    "addEventListener",
    "get",
    "1777341hTklOj",
    "\x20px-4\x20py-2\x20rounded-lg\x20mr-auto\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20",
    "15886611ZYGndk",
    "\x0a\x20\x20\x20\x20\x20\x20<li\x20class=\x22comment\x20pure-g\x20w-full\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22bg-light-",
    "8lHvQBu",
    "#chat",
    "click",
    "12551iOwVNs",
  ];
  _0x13e8 = function () {
    return _0x45e7ae;
  };
  return _0x13e8();
}
function nextFriend() {
  const _0x468535 = _0x4e0d1d,
    _0x5279b9 = friends["findIndex"](
      (_0x330078) => _0x330078 === currentFriendType
    );
  (currentFriend = CONSTANT[_0x468535(0x9b)][_0x468535(0xac)](
    (_0x19db48) => _0x19db48[_0x468535(0x90)] === currentFriendType
  )),
    (window[_0x468535(0x9c)][_0x468535(0xb2)] =
      _0x468535(0xaf) +
      friends[_0x5279b9 === friends["length"] - 0x1 ? 0x0 : _0x5279b9 + 0x1]);
}
function _0x30d8(_0x14300c, _0x3aed42) {
  const _0x13e85f = _0x13e8();
  return (
    (_0x30d8 = function (_0x30d834, _0x26c3f9) {
      _0x30d834 = _0x30d834 - 0x8f;
      let _0x1bb5a0 = _0x13e85f[_0x30d834];
      return _0x1bb5a0;
    }),
    _0x30d8(_0x14300c, _0x3aed42)
  );
}
document[_0x4e0d1d(0xb6)](_0x4e0d1d(0x98))[_0x4e0d1d(0x9e)](
  _0x4e0d1d(0xa6),
  nextFriend
);
async function main() {
  const _0x5eb982 = _0x4e0d1d;
  event[_0x5eb982(0xb1)]();
  const _0x27a021 = document["querySelector"]("#msg"),
    _0xe0e096 = _0x27a021[_0x5eb982(0x97)];
  if (!_0xe0e096) return;
  const _0x306b54 = await openai[_0x5eb982(0x9a)]["completions"][
    _0x5eb982(0xb4)
  ]({
    model: "gpt-3.5-turbo",
    temperature: 0.8,
    max_tokens: 0x32,
    messages: [
      {
        role: "system",
        content: CONSTANT[_0x5eb982(0x91)] + currentFriend[_0x5eb982(0x95)],
      },
      { role: _0x5eb982(0xbc), content: _0xe0e096 },
    ],
  });
  addNewAnswer(_0x306b54[_0x5eb982(0xaa)][0x0]["message"]["content"]);
}
function addNewAnswer(_0x181c45) {
  const _0x2c3acf = _0x4e0d1d;
  if (!_0x181c45) return;
  const _0x24be1b =
    _0x2c3acf(0xa3) +
    currentFriendType +
    _0x2c3acf(0xa1) +
    _0x181c45 +
    "\x0a\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20</li>";
  CHAT[_0x2c3acf(0xb3)](_0x2c3acf(0xae), _0x24be1b),
    (CHAT[_0x2c3acf(0xc0)] = CHAT[_0x2c3acf(0xbd)]);
}
