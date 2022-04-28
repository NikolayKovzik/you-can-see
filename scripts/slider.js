import { pets } from "./pets.js";
import { showModalWindow } from "./popup.js";

const leftButton = document.querySelector('.slider .left-button');
const rightButton = document.querySelector('.slider .right-button');
const cardsWrapper = document.querySelector('.pets__items');

let cardsArray = null;
let offsetOnClick = null

let laptopLMinWidth = window.matchMedia("(min-width: 1280px)");
let laptopMaxWidth = window.matchMedia("(max-width: 1279px)");
let laptopMinWidth = window.matchMedia("(min-width: 768px)");
let tabletMaxWidth = window.matchMedia("(max-width: 767px)");

function shuffleArray(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}

function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

window.addEventListener("load", function () {
    if (window.innerWidth >= 1280) {
        cardsArray = generateStartArray(3);
        offsetOnClick = 1080;
    } else if (window.innerWidth >= 768) {
        cardsArray = generateStartArray(2);
        offsetOnClick = 620;
    } else {
        cardsArray = generateStartArray(1)
        offsetOnClick = 310;
    }
    console.log(cardsArray)
    createStartPetsItems();
});

laptopLMinWidth.addEventListener('change', function (laptopL) {
    if (laptopL.matches) {
        offsetOnClick = 1080;
    }
});

laptopMaxWidth.addEventListener('change', function (laptopScreenSize) {
    if (laptopScreenSize.matches) {
        offsetOnClick = 620;
    }
});

laptopMinWidth.addEventListener('change', function (laptopScreenSize) {
    if (laptopScreenSize.matches) {
        offsetOnClick = 620;
    }
});

tabletMaxWidth.addEventListener('change', function (tabletScreenSize) {
    if (tabletScreenSize.matches) {
        offsetOnClick = 310;
    }
});


function getCard(pet) {
    let newCard = document.createElement('div');
    newCard.classList.add('card');
    newCard.innerHTML = `<img class="card__img" src=${pet.img} alt="dog named ${pet.name}">
                         <p class="card__name">${pet.name}</p>
                         <button class="button card__button">Learn more</button>`;
    return newCard;
}

function appendCard(card) {
    card.addEventListener('click', (event) => {
        showModalWindow(event.currentTarget.querySelector(".card__name").innerHTML)
    })
    cardsWrapper.append(card);
}

function prependCard(card) {
    card.addEventListener('click', (event) => {
        showModalWindow(event.currentTarget.querySelector(".card__name").innerHTML)
    })
    cardsWrapper.prepend(card);
}


function generateStartArray(cardsNumber) {
    let randomArray = shuffleArray(pets);
    let newArray = [];
    if (cardsNumber === 3) {
        newArray = [...randomArray.slice(0, 3)];
    }
    if (cardsNumber === 2) {
        newArray = [...randomArray.slice(0, 2)]
    }

    if (cardsNumber === 1) {
        newArray = [randomArray[0]];
    }

    return newArray;
}


function createStartPetsItems() {
    cardsArray.forEach((card) => {
        appendCard(getCard(card))
    });
}

function generateNewRandomPage(size) {
    let newPage = [];
    while (newPage.length < size) {
        let newPet = pets[randomInteger(0, 7)];
        if (!cardsArray.map((pet) => pet.name).includes(newPet.name) && !newPage.map((pet) => pet.name).includes(newPet.name)) {
            newPage.push(newPet)
        }
    }
    return newPage;
}






rightButton.addEventListener('click', (event) => {
    cardsWrapper.style['transition'] = `0.3s all`;
    
    let newPage = (window.innerWidth >= 1280) ? generateNewRandomPage(3) : (window.innerWidth >= 768) ? generateNewRandomPage(2) : generateNewRandomPage(1);
    console.log('newPage Right', newPage);
    newPage.forEach((item, ind) => {
        appendCard(getCard(newPage[ind]))
    })
    cardsArray = newPage.slice();
    
    cardsWrapper.style['right'] = `${offsetOnClick}px`;

    setTimeout(() => {
        let cards = cardsWrapper.querySelectorAll('.card')
        cardsWrapper.style['transition'] = `none`;
        if (window.innerWidth >= 1280) {
            cards[0].remove();
            cards[1].remove();
            cards[2].remove();
        } else if (window.innerWidth >= 768) {
            cards[0].remove();
            cards[1].remove();
        } else {
            cards[0].remove();
        }
        cardsWrapper.style['right'] = `0px`;
    }, 300)
});


leftButton.addEventListener('click', (event) => {
    cardsWrapper.style['transition'] = `0.3s all`;

    let newPage = (window.innerWidth >= 1280) ? generateNewRandomPage(3) : (window.innerWidth >= 768) ? generateNewRandomPage(2) : generateNewRandomPage(1);
    // console.log('newPage Left', newPage);
    newPage.forEach((item, ind) => {
        prependCard(getCard(newPage[ind]))
    })
    cardsArray = newPage.slice();
    // setTimeout(()=>{
        cardsWrapper.style['right'] = `-${offsetOnClick}px`;
    // },200)
    setTimeout(() => {

        let cards = cardsWrapper.querySelectorAll('.card')
        cardsWrapper.style['transition'] = `none`;
        if (window.innerWidth >= 1280) {
            cards[3].remove();
            cards[4].remove();
            cards[5].remove();
        } else if (window.innerWidth >= 768) {
            cards[2].remove();
            cards[3].remove();
        } else {
            cards[1].remove();
        }

        cardsWrapper.style['right'] = `0px`;
    }, 300)
});




