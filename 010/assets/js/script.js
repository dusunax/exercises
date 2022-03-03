// import {data} from './data.js';
console.log(data);

// D-Day
dDay();
function dDay(){
    let today=new Date();
    console.log(today.getDate());
}

// 읽기
const score_table=document.querySelector('.score_table');
let index=0;
score_table.innerHTML=""
read_table();
function read_table(){
    const target=data[index].score;
    const name=data[index].test_name;
    const type=data[index].test_type;
    const date=data[index].test_date;
    const place=data[index].test_place;
    document.querySelector('.test_name').innerText=name;
    document.querySelector('.test_type').innerText=type;
    document.querySelector('.test_date').innerText=date;
    document.querySelector('.test_place').innerText=place;

    for(let i=0; i<target.length; i++){
        const date=target[i].score_date;
        const desc=target[i].score_desc;
        const score=target[i].score_score;
        console.log(i, date, desc, score);
        row_templete_append(
            date,
            desc,
            score,
            type
        );
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