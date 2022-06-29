const time_el = document.querySelector('.real-time .textContent');
const time_reset_by = 30 * 1000
function getTime(){
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth()+1;
    const day = date.getDate();
    const hour = date.getHours();
    const min = date.getMinutes();
    const isday = (hour>=12)?'pm':'am';
    const time = `
        ${year}.${zero(month)}.${zero(day)}. 
        <div class="show-at-sm"></div>
        ${isday} ${zero(hour)}:${zero(min)}
    `;
    time_el.innerHTML = time;
}
getTime();
setInterval(()=>{
    getTime();
}, time_reset_by)
function zero(num){
    return (num < 10) ? num="0"+num : num;
}