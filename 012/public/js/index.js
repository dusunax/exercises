const btnAddNew = document.querySelector('.btnNewWorkout');
const btnclose = document.querySelector('.btnClose');
const modal = document.querySelector('.modal');
btnAddNew.addEventListener('click', showModal);
btnclose.addEventListener('click', hideModal);

function showModal(){
    modal.classList.add("active");
}
function hideModal(){
    event.defaultPrevented;
    modal.classList.remove("active");
}