// import {data} from './data.js';
// console.log(data);

// init
let dDay;
let index=0;
let target, t_name, t_type, t_date, t_place;
init_testData();
function init_testData(){
  target=data[index];
  t_name=target.exam_name;
  t_type=target.exam_type;
  t_date=target.exam_date;
  t_place=target.exam_place;
  dDay=targetDate_to_object(t_date);
}
function targetDate_to_object(date_input){
    date_input=date_input.split("/");
    date_input={
        year: date_input[0],
        mon: date_input[1],
        day: date_input[2]
    }
    return date_input;
}

// 읽기
const score_table=document.querySelector('.score_table');
read_title();
read_table();
function read_title(){
    innerText('.test_name', t_name);
    innerText('.test_type', t_type);
    innerText('.test_date', t_date);
    innerText('.test_place', t_place);
    if(target.pass==true){
      removeClass_On('.dDay.going');
      addClass_On('.dDay.end');
    };
}
function read_table(){
    score_table.innerHTML=""
    for(let i=0; i<target.score.length; i++){
        const date=target.score[i].score_date;
        const desc=target.score[i].score_desc;
        const score=target.score[i].test_score;
        row_templete_append(
            date,
            desc,
            score,
            t_type
        );
    }
    if(target.pass==true){
        document.querySelector('.passFail ').setAttribute('style', 'color: yellowgreen')
    }
}
function row_templete_append(date, desc, score, type){
    let result;
    score>=60?result="합격":result="탈락";
    let pass="fail";
    score>=60?pass="pass":"";

    let el=`
        <tr class="row">
            <td>
                <input type="text" value="${date}" name="input_type" readonly>
            </td>
            <td class="output_test_type">
                ${type}
            </td>
            <td>
                <input type="text" class="desc" value="${desc}" name="input_type" readonly>
            </td>
            <td>
                <input type="text" class="scores" value="${score}점" name="input_type" readonly>
            </td>
            <td>
                <span class="passFail ${pass}">${result}</span>
            </td>
        </tr>
    `
    score_table.innerHTML+=el;
}

// 테이블 수정, 저장
const btn_edit=document.querySelector('.btn_edit');
const btn_save=document.querySelector('.btn_save');
const tableControlBtn=document.querySelectorAll('.tableControl button');

function edit_handle(){
    const inputs=document.querySelectorAll('table input');
    saveEdit_toggle_states(inputs);
}
function save_handle(){
    const inputs=document.querySelectorAll('table input');
    saveEdit_toggle_states(inputs);
}
function saveEdit_toggle_states(inputs){
  if(btn_edit.classList.contains('show')){
      inputs.forEach((input) => {
        input.readOnly=false;
      });

  } else {
          inputs.forEach((input) => {
            input.readOnly=true;
          });
  }
  tableControlBtn[0].classList.toggle('show');
  tableControlBtn[1].classList.toggle('show');
}
btn_edit.addEventListener('click', edit_handle);
btn_save.addEventListener('click', save_handle);

// D-Day기능: 한달짜리(임시)
const setDate=new Date();
const td_day=two_digit(setDate.getDate());
const dDay_result=getDDay(td_day, dDay.day);
innerText('.test_dDay', dDay_result);

function getDDay(t_day, d_day){
    let result=d_day-t_day;
    result==0?result='day':"";
    result<0?document.querySelector('.test_dDay').setAttribute('style', 'color: red'):"";
    return result;
}

// 간단함수
function two_digit(input){
    let result=String(input).length<2?"0"+input:String(input);
    return result;
};
function innerText(el, text){
  document.querySelector(el).innerText=text;
};

function addClass_On(el){
  document.querySelector(el).classList.add('on');
}
function removeClass_On(el){
  document.querySelector(el).classList.remove('on');
}
function toggleClass_On(el, className){
  document.querySelector(el).classList.toggle(className);
}
