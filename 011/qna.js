// 변수
const stage_title = document.querySelector('.stage_title');
const btn_retry = document.querySelector('.btn_retry');
const yesNo_arr=['맞아', '아니야', '글쎄(다른 질문!)']
let level=0, this_idx, currIdx=0;
let answers=0;
let level_limit=2;
const result_title = document.querySelector('.result_title');
const result_img = document.querySelector('.img_box');
const result_desc = document.querySelector('.result_desc');
// init
const qna_box = document.querySelector('.qna_box');
const qna_answer=document.querySelectorAll('.qna_answer');
const qna_lenth=qna_answer.length;
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
    let next = (this_idx==2)?true:false;
    // console.log(this_idx, level, yesNo, next);
    if( level == 0 ){
        qna_nextLevel();
        qna_going(this_idx);
        return;
    } else if( level > level_limit-1 && !next){
        if(yesNo){
            answers += 1;
        }
        qna_ended();
        return;
    }
    if(yesNo){
        qna_nextLevel();
        qna_going(answers);
    } else if(next){
        qna_goingNext();
    } else {
        qna_goingNext();
    }
    console.log('클릭:', this_idx, "\nlevel:", level, '\n지금:', currIdx, '\n합: ', answers);
};
// QNA process
function qna_print(target){
    let count=0;
    stage_title.innerHTML=`<strong>level: ${level-1}/2.</strong><br> ${target.text}`
    qna_answer.forEach(li => {
        li.innerHTML=`${yesNo_arr[count++]}`
        if(count>3){
            li.setAttribute('style', 'display: none;')
        }
    });
};
function qna_going(idx){
    answers += idx;
    let target=qna[level][idx];
    qna_print(target);
};
function qna_goingNext(){
    if(currIdx==3){
        currIdx=-1;
    }
    let target=qna[level][currIdx+=1];
    qna_print(target);
};
function qna_nextLevel(){
    level+=1;
};
// 결과
function qna_ended(){
    stage_title.innerHTML=`제가 추천하는 커피는?!`
    qna_box.classList.remove('on');
    result.classList.add('on');
    console.log(answers+"\n결과: "+(answers+1)+'/8');
    document.querySelector('.img_box').innerHTML="결과 "+(answers)+"번째";
    result_print(answers);
};
function result_print(idx){
    console.log(answer[idx]);
    result_title.innerHTML=`${answer[idx].title}`
    result_desc.innerHTML=`${answer[idx].desc}`
    result_img.innerHTML=`${idx}번째 이미지`
}
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