window.addEventListener('DOMContentLoaded', ()=>{

    const btn_box=document.querySelector(".btn_crud");
    
    if(btn_box){
        
    }

})

function btnClick(name){
    const selectedModal=document.querySelector(".modal."+name);
    selectedModal.classList.add("on");
    setTimeout(()=>{
        selectedModal.classList.add("show");
    }, 100);
};
function btnClose(name){
    const selectedModal=document.querySelector(".modal."+name);
    selectedModal.classList.remove("on");
    selectedModal.classList.remove("show");
}