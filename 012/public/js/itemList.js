const workoutName=document.getElementsByClassName("workoutName");
const workoutPart=document.getElementsByClassName("workoutPart");
const workoutDate=document.getElementsByClassName("workoutDate");
const workoutNote=document.getElementsByClassName("workoutNote");
const workoutWeight=document.getElementsByClassName("workoutWeight");
const workoutCount=document.getElementsByClassName("workoutCount");
const itemImg=document.getElementsByClassName("itemImg");
const kgSet=document.getElementsByClassName("kgSet");

const itemContainer=document.querySelector(".itemContainer");

const item=`
    <div class="item">
        <div class="itemTitle">
            <div class="itemNameLeft">
                <strong class="workoutName">
                    기구이름
                </strong>
                /
                <span class="workoutPart">
                    운동부위
                </span>
            </div>
            <div class="itemNameRight">
                <span class="workoutDate">
                    날짜
                </span>
            </div>
        </div>
        <div class="itemBody">
            <div class="itemText">
                <div class="row">
                    <span class="workoutNote">
                        주의할 점
                    </span>
                </div>
                <div class="row kgSet">
                    <span class="workoutWeight">
                        무게
                    </span> kg
                    /
                    <span class="workoutCount">
                        횟수
                    </span> 세트
                </div>
            </div>
            <div class="itemImg">
            </div>
        </div>
    </div>
`

for(let i=0; i<workouts.length; i++){
    itemContainer.innerHTML+=item;
    workoutName[i].innerHTML=workouts[i].name;
    workoutPart[i].innerHTML=workouts[i].part;
    workoutDate[i].innerHTML=workouts[i].date;
    workoutNote[i].innerHTML=workouts[i].note;
    workoutWeight[i].innerHTML=workouts[i].weight;
    workoutCount[i].innerHTML=workouts[i].count;

    workouts[i].weight > 0 && workouts[i].count > 0?"":kgSet[i].style="display: none;";

    workouts[i].pic.forEach((img)=>{
        itemImg[i].innerHTML+=`
            <img src="img/${img.imgUrl}" alt="">
        `
    })
}