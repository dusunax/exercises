const _0x4a18c4 = _0x2969;
(function (_0x895dd5, _0x35a93b) {
  const _0x3679bf = _0x2969,
    _0x1951a4 = _0x895dd5();
  while (!![]) {
    try {
      const _0x38f576 =
        -parseInt(_0x3679bf(0xca)) / 0x1 +
        (parseInt(_0x3679bf(0xe3)) / 0x2) * (-parseInt(_0x3679bf(0xb6)) / 0x3) +
        parseInt(_0x3679bf(0xd2)) / 0x4 +
        (parseInt(_0x3679bf(0xe2)) / 0x5) * (-parseInt(_0x3679bf(0xda)) / 0x6) +
        parseInt(_0x3679bf(0xef)) / 0x7 +
        parseInt(_0x3679bf(0xb3)) / 0x8 +
        (-parseInt(_0x3679bf(0xd7)) / 0x9) * (-parseInt(_0x3679bf(0xc7)) / 0xa);
      if (_0x38f576 === _0x35a93b) break;
      else _0x1951a4["push"](_0x1951a4["shift"]());
    } catch (_0xd78826) {
      _0x1951a4["push"](_0x1951a4["shift"]());
    }
  }
})(_0xaa66, 0x8b610);
import { OpenAI } from "https://cdn.skypack.dev/pin/openai@v4.12.4-TiAvf6sAe2eUBom9QDCm/mode=imports/optimized/openai.js";
const constant = {
    COMMON_CONTENT:
      "미안해하거나\x20고맙다고\x20대답\x20하지마.\x20무조건\x20반말로\x20대답해.\x20남자\x20초등학생\x20같은\x20말투로\x20대답해줘,\x20하지만\x20성인이야.\x20대답은\x2010글자를\x20넘지\x20않게\x20짧게\x20대답해줘,\x20절대\x2030글자를\x20넘으면\x20안돼.\x20한\x20문장씩만\x20대답해줘.\x20emoji를\x20추가해서\x20대답해줘.\x20\x27응\x27을\x20\x27ㅇㅇ\x27으로\x20대답하는\x20것처럼\x20줄임말과\x20오타를\x20써줘.\x20system과\x20나는\x20친구야.\x20너는\x20AI\x20시스템이\x20아니라\x20친구야.\x20나를\x20도와주려고\x20하지마.\x20너는\x20지금\x20공부하고\x20있어.\x20너는\x20낮에\x20산책하고\x20밤에\x20공부해.\x20너는\x20내\x20동네에\x20살아.\x20너는\x20잔소리를\x20자주\x20하는\x20친구야.",
    FRIENDS: [
      { type: "nice", content: _0x4a18c4(0xb2) },
      {
        type: _0x4a18c4(0xe5),
        content:
          "system의\x20이름은\x20\x27나님\x27이야.\x20너는\x20주로\x20마라탕과\x20탕후루를\x20먹어.\x20너는\x20맵찔이야.\x20너는\x20나랑\x20동갑이야.\x20\x20친해서\x20대화에서\x20욕을\x20해도\x20돼.\x20대답하기\x20애매하면\x20ㅋㅋㅋ이라고\x20대답하고,\x20적합하지\x20않은\x20주제일\x20때는\x20\x27미친놈\x27\x20또는\x20\x27병신\x27\x20또는\x20\x27ㅅㅂ\x27로\x20대답해.",
      },
      { type: "cute", content: _0x4a18c4(0xd5) },
    ],
  },
  openai = new OpenAI({
    apiKey: _0x4a18c4(0xed),
    dangerouslyAllowBrowser: !![],
  }),
  CHAT = document[_0x4a18c4(0xd1)](_0x4a18c4(0xc0)),
  FORM = document[_0x4a18c4(0xd1)](_0x4a18c4(0xdf));
FORM["addEventListener"](_0x4a18c4(0xbf), main);
const themeClasses = [
    "bg-primary",
    _0x4a18c4(0xec),
    _0x4a18c4(0xe7),
    _0x4a18c4(0xe0),
  ],
  friends = constant[_0x4a18c4(0xd8)][_0x4a18c4(0xc3)](
    (_0xc2d286) => _0xc2d286[_0x4a18c4(0xd4)]
  ),
  search = window["location"][_0x4a18c4(0xc4)],
  searchParams = new URLSearchParams(search),
  currentFriendType =
    searchParams[_0x4a18c4(0xdc)](_0x4a18c4(0xbc)) || _0x4a18c4(0xd0);
let currentFriend = constant["FRIENDS"][_0x4a18c4(0xbd)](
  (_0x329eb4) => _0x329eb4[_0x4a18c4(0xd4)] === currentFriendType
);
function newTheme(_0x20b409) {
  const _0x12738f = _0x4a18c4;
  (currentFriend = constant[_0x12738f(0xd8)][_0x12738f(0xbd)](
    (_0x42faea) => _0x42faea[_0x12738f(0xd4)] === currentFriendType
  )),
    console[_0x12738f(0xdb)](constant["FRIENDS"], currentFriend),
    document["querySelector"](_0x12738f(0xb5))[_0x12738f(0xea)](
      "src",
      _0x12738f(0xb9) + _0x20b409 + _0x12738f(0xe9)
    ),
    (document[_0x12738f(0xd1)](_0x12738f(0xcf))[_0x12738f(0xeb)] = _0x20b409),
    themeClasses[_0x12738f(0xc3)]((_0x3d9cb1) => {
      const _0x5566b7 = _0x12738f,
        _0x3669f6 = document[_0x5566b7(0xcd)](_0x3d9cb1);
      Array["from"](_0x3669f6)[_0x5566b7(0xdd)]((_0x336df8) => {
        const _0x56f722 = _0x5566b7;
        _0x336df8[_0x56f722(0xc5)][_0x56f722(0xde)](_0x3d9cb1),
          _0x336df8[_0x56f722(0xc5)][_0x56f722(0xcc)](
            _0x3d9cb1 + "-" + _0x20b409
          );
      });
    });
}
newTheme(currentFriendType);
function nextFriend() {
  const _0x4a567d = _0x4a18c4,
    _0x129562 = friends[_0x4a567d(0xc8)](
      (_0x39134e) => _0x39134e === currentFriendType
    );
  (currentFriend = constant[_0x4a567d(0xd8)]["find"](
    (_0x3b9ea8) => _0x3b9ea8[_0x4a567d(0xd4)] === currentFriendType
  )),
    (window[_0x4a567d(0xcb)][_0x4a567d(0xc9)] =
      "?friend=" +
      friends[
        _0x129562 === friends[_0x4a567d(0xe8)] - 0x1 ? 0x0 : _0x129562 + 0x1
      ]);
}
document[_0x4a18c4(0xd1)](_0x4a18c4(0xb8))[_0x4a18c4(0xbe)](
  _0x4a18c4(0xe4),
  nextFriend
);
async function main() {
  const _0x4ce46b = _0x4a18c4;
  event[_0x4ce46b(0xf1)]();
  const _0x342903 = document[_0x4ce46b(0xd1)](_0x4ce46b(0xe1)),
    _0xbf31a2 = _0x342903[_0x4ce46b(0xb4)];
  if (!_0xbf31a2) return;
  const _0x3bdc82 = await openai[_0x4ce46b(0xc1)][_0x4ce46b(0xba)][
    _0x4ce46b(0xce)
  ]({
    model: _0x4ce46b(0xf0),
    temperature: 0.8,
    max_tokens: 0x32,
    messages: [
      {
        role: _0x4ce46b(0xb1),
        content: constant[_0x4ce46b(0xaf)] + currentFriend[_0x4ce46b(0xbb)],
      },
      { role: _0x4ce46b(0xc6), content: _0xbf31a2 },
    ],
  });
  addNewAnswer(
    _0x3bdc82[_0x4ce46b(0xd9)][0x0][_0x4ce46b(0xee)][_0x4ce46b(0xbb)]
  );
}
function _0x2969(_0x21ad03, _0x17770e) {
  const _0xaa66ff = _0xaa66();
  return (
    (_0x2969 = function (_0x29690e, _0x34f995) {
      _0x29690e = _0x29690e - 0xaf;
      let _0x15ba72 = _0xaa66ff[_0x29690e];
      return _0x15ba72;
    }),
    _0x2969(_0x21ad03, _0x17770e)
  );
}
function _0xaa66() {
  const _0x4c6393 = [
    "bg-light",
    "length",
    ".png",
    "setAttribute",
    "innerHTML",
    "bg-secondary",
    "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",
    "message",
    "62657EpZwcY",
    "gpt-3.5-turbo",
    "preventDefault",
    "COMMON_CONTENT",
    "\x0a\x20\x20\x20\x20\x20\x20<li\x20class=\x22comment\x20pure-g\x20w-full\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22bg-light-",
    "system",
    "system의\x20이름은\x20\x27나\x27야.\x20너는\x20주로\x20돈가스를\x20먹어.\x20적합하지\x20않은\x20주제일\x20때는\x20\x27그게\x20무슨\x20소리니\x27\x20또는\x20\x27와\x20정말?\x27\x20또는\x20\x27정말??\x27로\x20대답해.\x20",
    "5840736orpxmJ",
    "value",
    "#friend-image",
    "221604mXKkbo",
    "\x0a\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20</li>",
    "#next-friend",
    "assets/images/",
    "completions",
    "content",
    "friend",
    "find",
    "addEventListener",
    "submit",
    "#chat",
    "chat",
    "insertAdjacentHTML",
    "map",
    "search",
    "classList",
    "user",
    "843560qThPHR",
    "findIndex",
    "href",
    "677207CcKbHF",
    "location",
    "add",
    "getElementsByClassName",
    "create",
    ".friend-name",
    "nice",
    "querySelector",
    "2634884TuucVp",
    "scrollHeight",
    "type",
    "system의\x20이름은\x20\x27나\x27야.\x20너는\x20주로\x20국밥을\x20먹어.\x20적합하지\x20않은\x20주제일\x20때는\x20\x27🥹\x27\x20또는\x20\x27너무해..\x27로\x20대답해.\x20귀여운\x20말투로\x20대답해.\x20\x27!\x27는\x20\x27!!\x27으로\x20사용하고,\x20\x27?\x27는\x20\x27??\x27으로\x20대답해",
    "\x20px-4\x20py-2\x20rounded-lg\x20mr-auto\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20",
    "126BUOPjR",
    "FRIENDS",
    "choices",
    "2238dVnjau",
    "log",
    "get",
    "forEach",
    "remove",
    "#submit-form",
    "bg-accent",
    "#msg",
    "6945TLZOIK",
    "22MlBLKS",
    "click",
    "boy",
    "scrollTop",
  ];
  _0xaa66 = function () {
    return _0x4c6393;
  };
  return _0xaa66();
}
function addNewAnswer(_0x404157) {
  const _0x290bb7 = _0x4a18c4;
  if (!_0x404157) return;
  const _0xf9dacb =
    _0x290bb7(0xb0) +
    currentFriendType +
    _0x290bb7(0xd6) +
    _0x404157 +
    _0x290bb7(0xb7);
  CHAT[_0x290bb7(0xc2)]("beforeend", _0xf9dacb),
    (CHAT[_0x290bb7(0xe6)] = CHAT[_0x290bb7(0xd3)]);
}
