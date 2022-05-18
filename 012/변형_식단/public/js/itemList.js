const mealName=document.getElementsByClassName("mealName");
const mealDate=document.getElementsByClassName("mealDate");
const mealTime=document.getElementsByClassName("mealTime");
const mealDesc=document.getElementsByClassName("mealDesc");

const itemContainer=document.querySelector(".itemContainer");

const item=`
<div class="item">
    <div class="itemTitle">
        <div class="itemNameLeft">
            <strong class="mealType">
                1st
            </strong>
            |
            <span class="mealDayNight">
                3
            </span> 
            <span class="mealTime">
                3
            </span>시
        </div>
        <div class="itemNameRight">
            <span class="mealDate">
                2022/22/22
            </span>
        </div>
    </div>
    <div class="itemBody">
        <div class="itemText">
            <h1 class="mealName">
                샐러드
            </h1>
            <p class="mealDesc">
                야채, 밥, 닭가슴살 1, 계란 1, 오리엔탈 소스
            </p>
        </div>
        <div>
            <img class="itemImg" src="public/img/testImg.jpg" alt="">
        </div>
    </div>
</div>
`
const imgUrl = "public/img/"
const itemImg=document.getElementsByClassName("itemImg");


const selectMealOption=document.getElementsByClassName("mealType");
const selectTimeOption=document.getElementsByClassName("mealDayNight");

currentItems.forEach((daysItem)=>{
    for(let i=0; i<daysItem.items.length; i++){
        itemContainer.innerHTML+=item;
        mealDate[i].innerHTML=daysItem.items[i].mealDate;
        mealName[i].innerHTML=daysItem.items[i].mealName;
        mealTime[i].innerHTML=daysItem.items[i].mealTime;
        mealDesc[i].innerHTML=daysItem.items[i].mealDesc;
        itemImg[i].setAttribute("src", imgUrl+daysItem.items[i].mealPic);
        
        selectTimeOption[i].innerHTML=daysItem.items[i].selectTimeOption;
        selectMealOption[i].innerHTML=daysItem.items[i].selectMealOption;
    }
});