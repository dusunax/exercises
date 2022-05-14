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
const stem=[ "경", "신", "임", "계", "갑", "을", "병", "정", "무", "기"];
const branch=["신", "유", "술", "해", "자", "축", "인", "묘", "진", "사", "오", "미"];
let result;
let currentStem;

// 계산법

function getYearInput(){
    document.querySelector(".result").classList.add("show");
    let originYear = Math.floor(document.querySelector("#inputYear").value);
    let year=originYear;
    if (year < 0) {
        year = Math.abs(year-3);
    }
    if (year == 0 || isNaN(year)){
        result="숫자를 입력하세요."
    } else {
        result=originYear+"년생<br>"
        result+="<strong>"+calcStem(year);
        result+=calcBranch(year)+"년</strong>"+"입니다.";
    }
}
function calcStem(year){
    currentStem = stem[(year) % 10];
    return currentStem;
}
function calcBranch(year){
    let currentBranch = branch[(year) % 12];
    return currentBranch;
}

// 버튼클릭이벤트
const btnInput=document.querySelector("#btnInput");
btnInput.addEventListener('click', function(){
    getYearInput();
    const output=document.querySelector("#output");
    output.innerHTML=result;
})

const branch_box=document.querySelector(".branch_box");
branch.forEach((arr)=>{
    branch_box.innerHTML+=`<div>${arr}</div>`
})
const stem_box=document.querySelector(".stem_box");
stem.forEach((arr)=>{
    stem_box.innerHTML+=`<div>${arr}</div>`
})

