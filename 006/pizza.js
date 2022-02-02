let e_x;
let e_y;
let current_color="";
let bt_count=0;
const btns_color=['tomato', 'wheat', 'salmon', 'olivedrab', '#222'];
const plate=document.querySelector('.plate');
const pizza_toppings=document.querySelector('.pizza_toppings');
const topping_btn=document.querySelectorAll('.topping_btn');
const cursor=document.querySelector('.cursor');
const dough=document.querySelectorAll('.dough');
const btn_cook=document.querySelector('.btn_cook');
let dough_count=dough.length;
let toppings_on_pizza=document.querySelector('.new_topping');

// 이벤트 핸들
function handleBtnClick(){
    cursor.style.backgroundColor=this.style.backgroundColor;
    current_color=this.style.backgroundColor;

    topping_btn.forEach((btns)=>{btns.classList.remove('on')})
    this.classList.add('on');
}
function handleDoughClick(){
    if(dough_count==0){
        alert("반죽이 없습니다.")
    } else if(!this.classList.contains('dough_empty')){
        cursor.style.backgroundColor='transparent';
        this.classList.add('dough_empty');
        dough_count-=1;
        pizza_toppings.innerHTML="";
    }
}
function handlePlateClick(){
    let e_xx=e_x-plate.offsetLeft ;
    let e_yy=e_y-plate.offsetTop ;
    new_topping(e_xx+'px', e_yy+'px');
};
function handleCookingBtnClick(){
    add_to_list(this);
    toppings_on_pizza=document.querySelectorAll('.new_topping');
    console.log(toppings_on_pizza);
};
// 여기---------------------------------------------
function add_to_list(addThis){
    topping_list+=addThis;
}
function getIndex(el){
    // let el_siblings=el.parentNode.children;
    // .indexOf.call(el_siblings, element)
}
let topping_list=new Array(btns_color.length);
topping_list.fill(0);
console.log(topping_list);
// ------------------------------------------------

// 함수
function new_topping(calc_x, calc_y){
    let newTopping=document.createElement('div');
    newTopping.classList.add('new_topping');
    newTopping.style.backgroundColor=cursor.style.backgroundColor;
    newTopping.style.left=calc_x;
    newTopping.style.top=calc_y;
    pizza_toppings.appendChild(newTopping);
}
function gameover(){
    alert("gameover")
}
// 이벤트 리스너
topping_btn.forEach((btns)=>{
    btns.addEventListener('click', handleBtnClick);
    btns.style.backgroundColor=btns_color[bt_count++];
});
dough.forEach((piece)=>{
    piece.addEventListener('click', handleDoughClick);
});
plate.addEventListener('mousedown', handlePlateClick);
btn_cook.addEventListener('mousedown', handleCookingBtnClick);
window.addEventListener('mousemove', function(){
    e_x=window.event.clientX;
    e_y=window.event.clientY;
    cursor.style.top=e_y+'px';
    cursor.style.left=e_x+'px';
});