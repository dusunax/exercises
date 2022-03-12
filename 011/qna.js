// init, handle
const qna_box = document.querySelector('.qna_box');
const result = document.querySelector('.result');
const qna_answer=document.querySelectorAll('.qna_answer');
qna_answer.forEach((e)=>{
    e.addEventListener('click', qnaClick_handle);
});
let level=0;
let count=0;
let answers=[];
qnaInit();
function qnaClick_handle(){
    let this_idx = getIndex(getSibling(this), this);
    let yesNo = !this_idx;
    if(yesNo == true){
        qnaChange(this_idx);
        level+=1;
    } else {
        qnaChange(this_idx);
    }
};
function qnaInit(){
    qna_answer.forEach(li => {
        li.innerHTML=`${qna[level][count++].text}`
    });
    count=0;
    level+=1;
}
const stage_title = document.querySelector('.stage_title');
const yesNo_arr=['맞아', '아니야', '글쎄(다른 질문!)']
function qnaChange(this_idx){
    console.log(this_idx);
    if(level<3){
        stage_title.innerHTML=`Yes: ${level-1}/2. ${qna[level][this_idx].text}`
        qna_answer.forEach(li => {
            li.innerHTML=`${yesNo_arr[count++]}`
            if(count>3){
                li.setAttribute('style', 'display: none;')
            }
        });
    } else {
        stage_title.innerHTML=`내가 좋아하는 캡슐커피 스타일은?!`
        qna_box.classList.remove('on');
        result.classList.add('on');
    }
    count=0;
}
// 
const btn_retry = document.querySelector('.btn_retry');
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