let slider = document.querySelectorAll(".pic");
let slideContent = document.querySelectorAll(".pic + li");

slider = Array.from(slider)
slideContent = Array.from(slideContent)

slider.forEach((list, idx) => {
    console.log(list, idx);
    list.addEventListener('click', () => {
        slideContent[idx].classList.toggle('active')
    })
})