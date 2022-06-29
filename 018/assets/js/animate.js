let slider = document.querySelectorAll(".pic");
let slideContent = document.querySelectorAll(".pic + li");

slider = Array.from(slider)
slideContent = Array.from(slideContent)

slider.forEach((list, idx) => {
    list.addEventListener('click', () => {
        slideContent[idx].classList.toggle('active')
    })
})

// 
const header = document.querySelector('header');
let h_top = header.offsetTop;
const wrap = document.querySelector('.wrap');
const weather = document.querySelector('#weather');
let w_o_top = weather.scrollTop;
console.log(weather);

window.onscroll = function () {
    header_sticky()
};

function header_sticky() {
    if (window.scrollY > h_top) {
        if (!header.classList.contains('fixed')) {
            header.classList.add('fixed')
            wrap.style.paddingTop = header.clientHeight + 'px'
        }
    } else {
        if (header.classList.contains('fixed')) {
            header.classList.remove('fixed')
            wrap.style.paddingTop = '0px'
        }
    }
}
