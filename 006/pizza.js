let e_x, e_y;
let current_color="";
let tmp_counter=0;
const btns_color=['tomato', 'wheat', 'salmon', 'olivedrab', '#222'];
const pizza_type_arr=['구운빵', '피자', '페퍼로니 피자', '야채 피자', '콤비네이션 피자']
const plate=document.querySelector('.plate');
const pizza_toppings=document.querySelector('.pizza_toppings');
const topping_btn=document.querySelectorAll('.topping_btn');
const cursor=document.querySelector('.cursor');
const dough=document.querySelectorAll('.dough');
const btn_cook=document.querySelector('.btn_cook');
let dough_count=dough.length;
let toppings_on_pizza=document.querySelector('.new_topping');
// 토핑
let topping_list=new Array(btns_color.length);
topping_list.fill(0);
let current_topping=-1;
const cooking_result=document.querySelectorAll('.cooking_result_text');
const pizza_type=document.querySelector('.pizza_type');
const pizza_achive=document.querySelectorAll('.pizza_achive');
const btn_giveup=document.querySelector('.btn_giveup');

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
        current_topping=-1;
        topping_list.fill(0);
        result_text();
        pizza_toppings.innerHTML="";
        pizza_type.innerHTML="";
    }
}
function handlePlateClick(){
    let e_xx=e_x-plate.offsetLeft ;
    let e_yy=e_y-plate.offsetTop ;
    new_topping(e_xx+'px', e_yy+'px');
    current_topping!=-1?dough_onClick():"";
    result_text();
};
function handleCookingBtnClick(){
    let result=chk_pizzalist();
    for(let i=0; i<pizza_type_arr.length; i++){
        if(result == pizza_type_arr[i]){
            textStyle_pizzaAchive(i);
        }
    }
};
btn_onClick();
function btn_onClick(){
    for (let i = 0; i < topping_btn.length; i++) {
        ((idx)=>{
            topping_btn[idx].onclick = function() {
                current_topping=idx;
            }
        })(i);
    }
}
function dough_onClick(){
    topping_list[current_topping]+=1;
    console.log(topping_list);
};
function result_text(){
    for (let i = 0; i < cooking_result.length; i++) {
        cooking_result[i].innerHTML=topping_list[i];
    };
};
function chk_pizzalist(){
    for(let i=0; i<topping_list.length; i++){
        let type="구운빵";
        let top="";
        if(topping_list[0]>0 && topping_list[1]>0){
            type="피자"
        } else if(topping_list[1]>0){
            top+="치즈 "
        } else if(topping_list[0]>0){
            top+="짭짤한 "
        }
        if(topping_list[2]>0){
            top+="페퍼로니 "
        }
        if(topping_list[3]>0){
            top+="피망 "
        }
        if(topping_list[4]>0){
            top+="올리브 "
        }
        if(topping_list[3]>0 && topping_list[4]>0){
            if(!topping_list[2]>0){
                top="야채 "
            } else {
                top="콤비네이션 "
            }
        }
        let yourCooking=top+type;
        pizza_type.innerHTML=yourCooking;
        return yourCooking;
    }
};
function textStyle_pizzaAchive(idx){
    pizza_achive[idx].classList.add('text_active');
}
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
    alert("gameover");
    dough.forEach((el)=>{el.classList.remove('dough_empty');});
    pizza_achive.forEach((el)=>{el.classList.remove('text_active');});
    dough_count=dough.length;
}
// 이벤트 리스너
tmp_counter=0;
topping_btn.forEach((btns)=>{
    btns.addEventListener('click', handleBtnClick);
    btns.style.backgroundColor=btns_color[tmp_counter++];
});
tmp_counter=0;
pizza_achive.forEach((el)=>{
    el.innerHTML=pizza_type_arr[tmp_counter++]
})
dough.forEach((piece)=>{
    piece.addEventListener('click', handleDoughClick);
});
plate.addEventListener('mousedown', handlePlateClick);
btn_cook.addEventListener('mousedown', handleCookingBtnClick);
btn_giveup.addEventListener('mousedown', gameover);
window.addEventListener('mousemove', function(){
    e_x=window.event.clientX;
    e_y=window.event.clientY;
    cursor.style.top=e_y+'px';
    cursor.style.left=e_x+'px';
});