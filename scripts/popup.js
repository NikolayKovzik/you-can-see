import { pets } from "./pets.js"

export const cards = document.querySelectorAll(".pets .card");
export const modalWindowWrapper = document.querySelector(".modal-window__wrapper");
let closeButton;
let modalWindow
const body = document.querySelector('body');


function getPetFromJSON(petName) {
    return pets.find((pet) => pet.name === petName)
}

function createModalWindow(petName) {
    let pet = getPetFromJSON(petName);
    let newWindow = document.createElement('div');
    newWindow.classList.add('modal-window');
    newWindow.innerHTML = `<div class="modal-window">
        <img class="modal-window__img" alt="decor-img" src=${pet.img}
            aria-hidden="true">
        <div class="modal-window__content">
            <h3 class="modal-window__name">${petName}</h3>
            <p class="modal-window__breed">${pet.type} - ${pet.breed}</p>
            <p class="modal-window__description">${pet.description}</p>
            <ul class="modal-window__list">
                <li class="modal-window__list-item"><b>Age:</b> ${pet.age}</li>
                <li class="modal-window__list-item"><b>Inoculations:</b> ${pet.inoculations}</li>
                <li class="modal-window__list-item"><b>Diseases:</b> ${pet.diseases}</li>
                <li class="modal-window__list-item"><b>Parasites:</b> ${pet.parasites}</li>
            </ul>
        </div>
        <button class="modal-window__close-button">
            <svg class="modal-window__svg-cross">
                <use xlink:href="../assets/svg/sprite.svg#Vector"></use>
              </svg>
        </button>
    </div>`
    return newWindow;
}

export function showModalWindow(petName) {
    modalWindow = createModalWindow(petName);
    modalWindowWrapper.append(modalWindow);
    modalWindow.style.transition = 'transform 0.5s ease 0s';
    closeButton = modalWindow.querySelector(".modal-window__close-button");
    closeButton.addEventListener('click', () => {
        closeModalWindow();
    })
    body.classList.add('stop-scrolling');
    setTimeout(()=>{
        modalWindowWrapper.classList.add('visible');
    },50);

}

export function closeModalWindow() {
    modalWindow.style.transition = 'none';
    document.querySelector(".modal-window").remove();
    body.classList.remove('stop-scrolling');
    modalWindowWrapper.classList.remove('visible');
}

