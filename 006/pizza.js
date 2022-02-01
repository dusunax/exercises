let bt_count=0;
const btns_color=['tomato', 'wheat', 'salmon', 'olivedrab', '#222'];

const topping_btn=document.querySelectorAll('.topping_btn');
const cursor=document.querySelector('.cursor');
const dough=document.querySelectorAll('.dough');

function handleBtnClick(){
    cursor.style.backgroundColor=this.style.backgroundColor;
}
function handleDoughClick(){
    cursor.style.backgroundColor='transparent';
}

// 
tmp("red");
function tmp(color){
    let newTopping=document.createElement('div')
    newTopping.classList.add('new_topping')
    console.log(newTopping, color);
};
// 

topping_btn.forEach((btns)=>{
    btns.addEventListener('click', handleBtnClick);
    btns.style.backgroundColor=btns_color[bt_count++];
});
dough.forEach((piece)=>{
    piece.addEventListener('click', handleDoughClick);
});
window.addEventListener('mousemove', function(){
    let e_x=window.event.clientX +'px';
    let e_y=window.event.clientY +'px';
    cursor.style.top=e_y;
    cursor.style.left=e_x;
});

