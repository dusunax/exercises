const canvas=document.getElementById('jsCanvas');
const cContext=canvas.getContext('2d');
const colors=document.querySelectorAll('.controls_color');
const INITIAL_COLOR="#2c2c2c";
const CANVAS_SIZE=700;
const range=document.getElementById('jsRange');
const mode=document.getElementById('jsMode');
const mode_icon=document.querySelectorAll('.icon_mode');
const btnSave=document.getElementById('jsSave');

canvas.width=CANVAS_SIZE;
canvas.height=CANVAS_SIZE;
cContext.fillStyle="#fff";
cContext.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
cContext.lineWidth=2.5;
cContext.strokeStyle=INITIAL_COLOR;
cContext.fillStyle=INITIAL_COLOR;

let painting=false;
let filling=false;
function stopPainting(){
    painting=false;
}
function startPainting(){
    painting=true;
}
function onMouseDown(){
    painting=true;
}
function onMouseUp(){
    stopPainting();
}
function onMouseMove(event){
    const x=event.offsetX;
    const y=event.offsetY;
    if(!painting){
        cContext.beginPath();
        cContext.moveTo(x, y); //누르기 전까지 좌표
    } else {
        cContext.lineTo(x, y); //line(sub-path)
        cContext.stroke();     //line에 stroke
    }
}
function handleColorChange(event){
    let color=event.target.style.backgroundColor;
    cContext.strokeStyle=color;
    cContext.fillStyle=cContext.strokeStyle;
    mode_icon.forEach((icon)=>{
        color=="white"?color="#ddd":"";
        icon.style.color=color;
    })
}
function handleRangeChange(event){
    const stroke_size=event.target.value;
    cContext.lineWidth=stroke_size;
}
function handleModeChange(event){
    if(filling){
        filling=false;
        mode.children[2].innerText="그리기";
        mode_icon[0].style.display="inline-block";
        mode_icon[1].style.display="none";
    } else {
        filling=true;
        mode.children[2].innerText="채우기";
        mode_icon[0].style.display="none";
        mode_icon[1].style.display="inline-block";
    }
}
function handleCanvasClick(){
    if(filling){
        cContext.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}
function handleCM(event){
    event.preventDefault();
}
function handleSaveClick(){
    const img=canvas.toDataURL();
    const link=document.createElement("a");
    link.href=img;
    link.download="PainJS";
    link.click();
}
Array.from(colors).forEach(color_pick => color_pick.addEventListener("click", handleColorChange));
if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}
if(range){
    range.addEventListener("input", handleRangeChange);
}
if(mode){
    mode.addEventListener("click", handleModeChange);
}
if(btnSave){
    btnSave.addEventListener("click", handleSaveClick);
}