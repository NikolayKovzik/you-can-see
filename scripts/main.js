import { hamburger, addMenu, closeMenu, burgerMenuLinks, blackout } from "./hamburger.js";
import { pets } from "./pets.js";
import { cards, showModalWindow, modalWindowWrapper, closeModalWindow } from "./popup.js"


/********burger-menu*************/

let laptopMinWidth = window.matchMedia("(min-width: 768px)");



laptopMinWidth.addEventListener('change', function (laptopMinScreenSize) {
    if (laptopMinScreenSize.matches) {
        closeMenu();
    }
});

blackout.addEventListener('click', () => closeMenu());

hamburger.addEventListener('click', (event) => {
    if (event.currentTarget.classList.contains('open-menu')) {
        closeMenu();
    } else {
        addMenu();
    }
});

burgerMenuLinks.forEach((link) => {
    link.addEventListener('click', () => closeMenu())
})


/********popup*************/


cards.forEach((card) => {
    card.addEventListener('click', (event) => {
        // console.log(event.currentTarget.childNodes[3].innerHTML);
        showModalWindow(event.currentTarget.querySelector(".card__name").innerHTML)
    })
});

modalWindowWrapper.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal-window__wrapper')) {
        closeModalWindow();
    }
})


/**** pagination *****/



// laptopLMinWidth.addEventListener('change', function (laptopLScreenSize) {
//     if (laptopLScreenSize.matches) {
//         console.log(generatePages());
//     }
// });
