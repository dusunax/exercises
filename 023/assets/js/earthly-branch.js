/* 
60갑자란?: 천간(십간)과 지지(십이지)의 조합이다.

천간: {
    영어: "Celestial stem",
    설명: "날짜, 달, 연도 등을 나타냄",
    종류: ["갑", "을", "병", "정", "무", "기", "경", "신", "임", "계"],
    계산법: "서기해를 10으로 나눈 후, 0~9 종류에 대응시킨다.",
    기원전: "숫자를 음수로 바꾸고 3을 뺀 후 계산한다."
}
지지: {
    영어: "Earthly branch",
    설명: "띠를 나타냄",
    종류: ["자", "축", "인", "묘", "진", "사", "오", "미", "신", "유", "술", "해"],
    계산법: "서기해를 12로 나는 후, 그 나머지를 0~11에 대입시킨다.",
    기원전: "숫자를 음수로 바꾸고 3을 뺀 후 계산한다."
}
*/
const stem = ["경", "신", "임", "계", "갑", "을", "병", "정", "무", "기"];
const branch = [
  "신",
  "유",
  "술",
  "해",
  "자",
  "축",
  "인",
  "묘",
  "진",
  "사",
  "오",
  "미",
];

const stemEmoji = ["👍", "💪", "🙏", "👑", "🦏", "🎁", "🐶", "🔥", "🌊", "🌵"];
const branchEmoji = [
  "🐭",
  "🐮",
  "🐯",
  "🐰",
  "🐲",
  "🐍",
  "🐴",
  "🐐",
  "🐒",
  "🐔",
  "🐶",
  "🐷",
];

// 해당하는 갑자를 return
const calcStem = (year) => stem[year % 10];
const calcBranch = (year) => branch[year % 12];
const calcEmojiStem = (year) => stemEmoji[year % 10];
const calcEmojiBranch = (year) => branchEmoji[year % 12];

/** fullYear를 입력 받고, 육십갑자 계산 결과 문자열을 리턴합니다. */
function getYearHandler(fullYear) {
  let result;
  let year = fullYear;
  const branchResult = calcStem(year) + calcBranch(year);

  if (year < 0) {
    year = Math.abs(year - 3);
  }
  if (year == 0 || isNaN(year)) {
    result = "숫자를 입력하세요.";
  } else {
    result = fullYear + "년생은<br>";
    result += "<strong>" + branchResult + "년</strong>" + "입니다.";
  }

  return {
    textResult: result,
    branchResult: branchResult,
    emojiBranchResult: calcEmojiStem(year) + calcEmojiBranch(year),
  };
}
