// import {data} from './data.js';
// console.log(data);

// init
let dDay;
let index=0;
let target=data[index].score;
let t_name=data[index].test_name;
let t_type=data[index].test_type;
let t_date=data[index].test_date;
let t_place=data[index].test_place;

// 읽기
const score_table=document.querySelector('.score_table');
init_testData();
read_title();
read_table();
function init_testData(){
    target=data[index];
    t_name=target.test_name;
    t_type=target.test_type;
    t_date=target.test_date;
    t_place=target.test_place;
    dDay=testDate_to_object(t_date);
}
function read_title(){
    document.querySelector('.test_name').innerText=t_name;
    document.querySelector('.test_type').innerText=t_type;
    document.querySelector('.test_date').innerText=t_date;
    console.log(target)
    if(target.pass==true){
        document.querySelector('.test_dDay_box.dDay_going').classList.remove('on');
        document.querySelector('.test_dDay_box.dDay_end').classList.add('on');
    }
    document.querySelector('.test_place').innerText=t_place;
}
function read_table(){
    score_table.innerHTML=""
    for(let i=0; i<target.score.length; i++){
        const date=target.score[i].score_date;
        const desc=target.score[i].score_desc;
        const score=target.score[i].score_score;
        // console.log(i, date, desc, score);
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
    inputs.forEach((input)=>{
        input.readOnly=false;
    });
    tableControlBtn[0].classList.toggle('show');
    tableControlBtn[1].classList.toggle('show');
}
function save_handle(){
    const inputs=document.querySelectorAll('table input');
    inputs.forEach((input)=>{
        input.readOnly=true;
    });
    tableControlBtn[0].classList.toggle('show');
    tableControlBtn[1].classList.toggle('show');
}
btn_edit.addEventListener('click', edit_handle);
btn_save.addEventListener('click', save_handle);

// D-Day기능
const setDate=new Date(); 
const td_day=two_digit(setDate.getDate());
const dDay_result=getDDay(td_day, dDay.day);
document.querySelector('.test_dDay').innerText=dDay_result;

console.log(dDay, td_day);
function getDDay(t_day, d_day){
    let result=d_day-t_day;
    console.log(result);
    result==0?result='day':""
    return result;
}
function two_digit(input){
    let result=String(input).length<2?"0"+input:String(input);
    return result;
}
function testDate_to_object(testDate){
    testDate=testDate.split("/");
    testDate={
        year: testDate[0],
        mon: testDate[1],
        day: testDate[2]
    }
    return testDate;
}
