const time_el = document.getElementById('time');
function getTime(){
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth()+1;
    const day = date.getDate();
    const hour = date.getHours();
    const min = date.getMinutes();
    const isday = (hour>=12)?'am':'pm';
    const time = `${year}.${zero(month)}.${zero(day)}. ${isday} ${zero(hour)}:${zero(min)}`;
    time_el.textContent=time;
}
getTime();
setInterval(()=>{
    getTime();
}, 1000)
function zero(num){
    return (num < 10) ? num = "0"+num:num;
}