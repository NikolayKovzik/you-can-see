import { pets } from "./pets.js";
import { showModalWindow } from "./popup.js";
let currentPage = 1;
const petsArray = createUniqueRandomArray();
let pagesArray;
let maxPage;
const cardsWrapper = document.querySelector('.pets__cards-wrapper');
const startButton = document.querySelector('.pets__pagination .start-button');
const endButton = document.querySelector('.pets__pagination .end-button');
const leftButton = document.querySelector('.pets__pagination .left-button');
const rightButton = document.querySelector('.pets__pagination .right-button');
const pageCount = document.querySelector('.pets__pagination .pets__page');

// let laptopLMinWidth = window.matchMedia("(min-width: 1280px)");


window.addEventListener("load", function() {
    if (window.innerWidth >= 1280) {
        pagesArray = generateArrayOfPages(8);
    } else if (window.innerWidth >= 768) {
        pagesArray = generateArrayOfPages(6);
    } else {
        pagesArray = generateArrayOfPages(3)
    }
    maxPage = pagesArray.length;
    console.log(pagesArray)
    createPage(1);
  });

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

function isItArrayOfUniqueElems(array) {
    return !array.find((item, index) => {
        return array.map(pet => pet.name).lastIndexOf(item.name) !== index;
    })
}

//let lvl = 0;
function createUniqueRandomArray() {
    let uniqueArray = [...shuffleArray(pets), ...shuffleArray(pets), ...shuffleArray(pets), ...shuffleArray(pets), ...shuffleArray(pets), ...shuffleArray(pets)];
    let isUniq = null;
    // console.log(`${++lvl}`); //depth of recursion
    for (let start = 0, end = 6; end <= 48; start += 6, end += 6) {
        // console.log(`array№ ${start / 6} ---- ${isItArrayOfUniqueElems(uniqueArray.slice(start, end))}`)   // false tries
        isUniq = isUniq === false ? false : isItArrayOfUniqueElems(uniqueArray.slice(start, end));
    }
    return isUniq ? uniqueArray : createUniqueRandomArray();
}

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
    cardsWrapper.appendChild(card);
}

function clearCardsWrapper() {
    cardsWrapper.querySelectorAll('.card').forEach((card) => {
        card.remove();
    })
}

function generateArrayOfPages(cardsPerPage) {
    let pages = [];
    for (let start = 0, end = cardsPerPage; end <= 48; start += cardsPerPage, end += cardsPerPage) {
        pages.push(petsArray.slice(start, end))
    }
    return pages
}


function createPage(page) {
    let i = 0;
    if (window.innerWidth >= 1280) {
        while (i < 8) {
            appendCard(getCard(pagesArray[page - 1][i]))
            i++
        }
    } else if (window.innerWidth >= 768) {
        while (i < 6) {
            appendCard(getCard(pagesArray[page - 1][i]))
            i++
        }
    } else {
        while (i < 3) {
            appendCard(getCard(pagesArray[page - 1][i]))
            i++
        }
    }
}

rightButton.addEventListener('click', (event) => {
    if (event.target.classList.contains('pets__button-arrow--active')) {
        clearCardsWrapper();
        createPage(++currentPage);
        pageCount.innerHTML = currentPage;
        if (currentPage > 1) {
            startButton.classList.remove('pets__button-arrow--inactive');
            startButton.classList.add('pets__button-arrow--active');
            leftButton.classList.remove('pets__button-arrow--inactive');
            leftButton.classList.add('pets__button-arrow--active');
        }
        if (currentPage >= maxPage) {
            endButton.classList.remove('pets__button-arrow--active');
            endButton.classList.add('pets__button-arrow--inactive');
            rightButton.classList.remove('pets__button-arrow--active');
            rightButton.classList.add('pets__button-arrow--inactive');
        }
    }
});

leftButton.addEventListener('click', (event) => {
    if (event.target.classList.contains('pets__button-arrow--active')) {
        clearCardsWrapper();
        createPage(--currentPage);
        pageCount.innerHTML = currentPage;
        if (currentPage < maxPage) {
            endButton.classList.remove('pets__button-arrow--inactive');
            endButton.classList.add('pets__button-arrow--active');
            rightButton.classList.remove('pets__button-arrow--inactive');
            rightButton.classList.add('pets__button-arrow--active');
        }
        if (currentPage <= 1) {
            startButton.classList.remove('pets__button-arrow--active');
            startButton.classList.add('pets__button-arrow--inactive');
            leftButton.classList.remove('pets__button-arrow--active');
            leftButton.classList.add('pets__button-arrow--inactive');
        }
    }
});

endButton.addEventListener('click', (event) => {
    if (event.target.classList.contains('pets__button-arrow--active')) {
        clearCardsWrapper();
        createPage(maxPage);
        pageCount.innerHTML = maxPage;
        currentPage = maxPage;
        endButton.classList.remove('pets__button-arrow--active');
        endButton.classList.add('pets__button-arrow--inactive');
        rightButton.classList.remove('pets__button-arrow--active');
        rightButton.classList.add('pets__button-arrow--inactive');
        startButton.classList.remove('pets__button-arrow--inactive');
        startButton.classList.add('pets__button-arrow--active');
        leftButton.classList.remove('pets__button-arrow--inactive')
        leftButton.classList.add('pets__button-arrow--active')
    }
})


startButton.addEventListener('click', (event) => {
    if (event.target.classList.contains('pets__button-arrow--active')) {
        clearCardsWrapper();
        createPage(1);
        pageCount.innerHTML = 1;
        currentPage = 1;
        startButton.classList.remove('pets__button-arrow--active');
        startButton.classList.add('pets__button-arrow--inactive');
        leftButton.classList.remove('pets__button-arrow--active');
        leftButton.classList.add('pets__button-arrow--inactive');
        endButton.classList.remove('pets__button-arrow--inactive');
        endButton.classList.add('pets__button-arrow--active');
        rightButton.classList.remove('pets__button-arrow--inactive');
        rightButton.classList.add('pets__button-arrow--active');
    }
})




console.log(petsArray);



