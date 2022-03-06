// import {data} from './data.js';
// console.log(data);

// init
const test_select=document.querySelector('#test_select');
const setTime=new Date();
let td_day=setTime.getDate();
let dDay;
let index=0;
let exam_list=[];
let target, t_name, t_type, t_date, t_place;
getData_mainIndex();
init_testData();
init_exam_select();
function getData_mainIndex(){
  for(let i=0; i<data.length; i++){
    exam_list.push(data[i].exam_no);
    if(data[i].show_first==true){
      index=data[i].exam_no;
    }
  }
};
function init_testData(){
  target=data[index];
  t_name=target.exam_name;
  t_type=target.exam_type;
  if(target.exam_date == null || target.exam_date.length < 1){
    t_date='-';
    t_place='-';
  } else {
    t_date=target.exam_date;
    t_place=target.exam_place;
    dDay=targetDate_to_object(t_date);
  }
};
function targetDate_to_object(date_input){
    date_input=date_input.split("/");
    date_input={
        year: date_input[0],
        mon: date_input[1],
        day: date_input[2]
    }
    return date_input;
};

// 인덱스 변경
const btn_prev=document.querySelector('.btn_prev');
const btn_next=document.querySelector('.btn_next');
btn_prev.addEventListener('click', btnClick_handle);
btn_next.addEventListener('click', btnClick_handle);
function btnClick_handle(){
  if(this.classList.contains('btn_next')){
    index=index+1;
  } else {
    index=index-1;
    if(index<0){
      index=exam_list[exam_list.length-1];
    }
  }
  index = index % exam_list.length;
  init_testData();
  read_title();
  read_table();
  getDDay(dDay.day);
};

// select옵션 change
test_select.addEventListener('change', selectChange_handle);
function selectChange_handle(){
    index=test_select.options.selectedIndex;
    init_testData();
    read_title();
    read_table();
    getDDay(dDay.day);
}
function init_exam_select(){
    for(let i=0; i<exam_list.length; i++){
      let classOptional="";
      data[i].pass==true?classOptional="class='over'":""
      let el=`<option value="${i}" ${classOptional}>${data[i].exam_name + " " + data[i].exam_type}</option>`;
      test_select.innerHTML+=el;
    }
    document.querySelector('option[value="'+index+'"]').setAttribute('selected', "selected")
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
    } else {
      addClass_On('.dDay.going');
      removeClass_On('.dDay.end');
    }
    getDDay(dDay.day);
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
    document.querySelector('#input_type').value=t_type;
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
btn_edit.addEventListener('click', edit_handle);
btn_save.addEventListener('click', save_handle);

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
  toggleClass_On('.btn_edit', 'show');
  toggleClass_On('.btn_save', 'show');
}

// D-Day기능: 한달짜리(임시)
function getDDay(d_day){
    let result;
    let target_el=document.querySelector('.test_dDay');
    if(d_day !== null){
      result=d_day-td_day;
      result==0?result='day':"";
      result<0?target_el.classList.add('over'):target_el.classList.remove('over');
    }
    if(t_date=="-" || t_date.length <= 1){
      removeClass_On('.going');
    }
    innerText('.test_dDay', result);
}

// btn_submit
let input_date, input_desc, input_score;
const input_date_el=document.querySelector('#input_date');
const input_desc_el=document.querySelector('#input_desc');
const input_score_el=document.querySelector('#input_score');
const btn_submit=document.querySelector('.btn_submit');
btn_submit.addEventListener('click', submitClick_handle);
function submitClick_handle(){
  event.preventDefault();
  getDataInput();
  row_templete_append(input_date, input_desc, input_score, t_type);
}
function getDataInput(){
  input_date=input_date_el.value;
  input_desc=input_desc_el.value;
  input_score=input_score_el.value;
  input_date_el.value="";
  input_desc_el.value="";
  input_score_el.value="";
  console.log(input_date, input_desc, input_score);
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
