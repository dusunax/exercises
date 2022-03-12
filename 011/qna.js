// 변수
const stage_title = document.querySelector('.stage_title');
const btn_retry = document.querySelector('.btn_retry');
const yesNo_arr=['맞아', '아니야', '글쎄(다른 질문!)']
let level=0, this_idx, currIdx=0;
let answers=0;
// init
const qna_box = document.querySelector('.qna_box');
const qna_answer=document.querySelectorAll('.qna_answer');
const result = document.querySelector('.result');
qna_answer.forEach((e)=>{
    e.addEventListener('click', qnaClick_handle);
});
qnaInit();
function qnaInit(){
    let count=0;
    qna_answer.forEach(li => {
        li.innerHTML=`${qna[level][count++].text}`
    });
}
// event 핸들
function qnaClick_handle(){
    this_idx = getIndex(getSibling(this), this);
    let yesNo = (this_idx==0)?true:false;
    if(level == 0){
        qna_nextLevel();
        qna_going(this_idx);
        currIdx = this_idx;
        answers += this_idx;
    } else if (level<2){
        if(yesNo){
            qna_nextLevel();    // level += 1
            qna_going(answers);        // 출력
            answers += currIdx;
        } else {                // 아니오 클릭
            if(currIdx==3){
                currIdx=-1;
            }
            qna_going(currIdx+=1);
        }
    } else {
        if(yesNo){
            answers += 1;
        }
        qna_ended();
    };
    console.log('클릭:', this_idx, "\nlevel:", level, '\n지금:', currIdx, '\n합: ', answers);
};
// QNA process
function qna_going(idx){
    let target=qna[level][idx];
    qna_print(target);
};
function qna_print(target){
    let count=0;
    stage_title.innerHTML=`<strong>Yes: ${level-1}/2.</strong><br> ${target.text}`
    qna_answer.forEach(li => {
        li.innerHTML=`${yesNo_arr[count++]}`
        if(count>3){
            li.setAttribute('style', 'display: none;')
        }
    });
};
function qna_nextLevel(){
    level+=1;
};
function qna_ended(){
    stage_title.innerHTML=`내가 좋아하는 캡슐커피 스타일은?!`
    qna_box.classList.remove('on');
    result.classList.add('on');
    console.log(answers+"\n결과: "+(answers+1)+'/8');
    document.querySelector('.img_box').innerHTML="결과 "+(answers)+"번째"
};
// redirect
btn_retry.addEventListener('click', function(){
    location.reload();
})
// 간단 함수
function getIndex(array, el){
    return [].indexOf.call(array, el);
};
function getSibling(el){
    return Array.from(el.parentNode.children);
};