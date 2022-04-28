
export const hamburger = document.querySelector('.hamburger');
export const burgerMenuLinks = document.querySelectorAll('.burger-menu__link')
export const blackout = document.querySelector('.blackout');
const burgerMenu = document.querySelector('.burger-menu');
const body = document.querySelector('body');


export function addMenu() {
    hamburger.classList.add('open-menu');
    body.classList.add('stop-scrolling');
    blackout.classList.add('visible');
    burgerMenu.classList.add('visible');
}

export function closeMenu() {
    hamburger.classList.remove('open-menu');
    body.classList.remove('stop-scrolling');
    blackout.classList.remove('visible');
    burgerMenu.classList.remove('visible');
}



