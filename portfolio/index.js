



const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.nav-list');
const menuItem = document.querySelectorAll('.nav-item');

function toggleMenu() {
        hamburger.classList.toggle('open-menu');
        menu.classList.toggle('nav-list-active');
}

hamburger.addEventListener('click', toggleMenu);


menuItem.forEach(item => {
    item.addEventListener('click', () => {
        hamburger.classList.toggle('open-menu');
        menu.classList.toggle('nav-list-active');
    })
})
