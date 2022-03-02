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