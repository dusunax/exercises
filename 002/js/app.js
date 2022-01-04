const canvas=document.getElementById('jsCanvas');
const cContext=canvas.getContext('2d');
canvas.width=700;
canvas.height=700;
cContext.lineWidth=2.5;
cContext.strokeStyle="#2c2c2c";

let painting=false;
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

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
}