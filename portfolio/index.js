import i18Obj from './translate.js';

/*Hamburger menu*/

const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.nav-list');
const menuItem = document.querySelectorAll('.nav-item');
const blackout = document.querySelector('.blackout');

function toggleMenu() {
    hamburger.classList.toggle('open-menu');
    menu.classList.toggle('nav-list-active');
    blackout.classList.toggle('active');
}

hamburger.addEventListener('click', toggleMenu);


menuItem.forEach(item => {
    item.addEventListener('click', toggleMenu)
})




/*Switching images*/

const portfolioButtons = document.querySelectorAll('.portfolio-button');
const portfolioImages = document.querySelectorAll('.portfolio-image');
const seasons = ['winter', 'spring', 'summer', 'autumn'];

/*
  const buttonWrapper = document.querySelector('.button-wrapper');
  function switchImages(event) {
    if(event.target.classList.contains('portfolio-button')) {
      
    }
  }
  buttonWrapper.addEventListener('click', switchImages);*/



portfolioButtons.forEach((currentButton, seasonIndex) => {
    currentButton.addEventListener('click', () => {
        portfolioImages.forEach((img, imgIndex) => {
            img.src = `./img/${seasons[seasonIndex]}/${imgIndex + 1}.jpg`;
            img.alt = `${seasons[seasonIndex]} image`;
        });
        portfolioButtons.forEach((button,index) => {
            seasonIndex == index ? (currentButton.classList.remove('button-dark'), currentButton.classList.add('button-gold'))
                                 : button.classList.contains('button-gold') ? (button.classList.remove('button-gold') , button.classList.add('button-dark'))
                                 : null;
        });
    });
});


/* Image caching*/


function preloadImages() {
    for(let season of seasons) {
        for(let i = 1; i <= 6; i++) {
            const img = new Image();
            img.src = `./img/${seasons[season]}/${i}.jpg`;
        }
    }
}

preloadImages();


/* Translate page*/


const ruButton = document.querySelector('.ru');
const engButton = document.querySelector('.en');

function translatePage(event){
    let data = document.querySelectorAll('[data-translate]');
    for(let currentElement of data){
        if (currentElement.placeholder) {
            currentElement.placeholder = i18Obj[event.target.textContent][currentElement.getAttribute('data-translate')];
            currentElement.textContent = '';
          }
        currentElement.textContent = i18Obj[event.target.textContent][currentElement.getAttribute('data-translate')];
    }

    (event.target.textContent === 'ru') ? document.querySelector('.nav-list').classList.add('ru-mode')
                                        : document.querySelector('.nav-list').classList.remove('ru-mode');

}

ruButton.addEventListener('click',translatePage);
engButton.addEventListener('click',translatePage);




