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
    seasons.forEach((season,seasonIndex) => {
        for(let i = 1; i <= 6; i++) {
            let img = new Image();
            img.src = `./img/${seasons[seasonIndex]}/${i}.jpg`;
            console.log(img.src);
        }
    });
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

    (event.target.textContent === 'ru') ? (document.querySelector('.nav-list').classList.add('ru-mode'), 
                                           document.querySelector('.en').classList.remove('active'),
                                           document.querySelector('.ru').classList.add('active'))
                                        : (document.querySelector('.nav-list').classList.remove('ru-mode'),
                                           document.querySelector('.ru').classList.remove('active'),
                                           document.querySelector('.en').classList.add('active'));

}

ruButton.addEventListener('click',translatePage);
engButton.addEventListener('click',translatePage);




/*light theme*/
const switcher = document.querySelector('.switch-theme-svg');
let toggle = false;

function switchTheme(){
    toggle = Number(!toggle);
    switcher.src = `./img/svg/switch-theme-button-${toggle}.svg`
    
    if(toggle){
        document.documentElement.style.setProperty('--background-color', '#fff');
        document.documentElement.style.setProperty('--button-text-color', '#000');
        document.documentElement.style.setProperty('--button-dark-background-hover', '#bdae82');
        document.documentElement.style.setProperty('--title-color', '#000');
        document.documentElement.style.setProperty('--color-black', '#fff');
        document.documentElement.style.setProperty('--color-white', '#000');
    } else {
        document.documentElement.style.setProperty('--background-color', '#000');
        document.documentElement.style.setProperty('--button-text-color', '#bdae82');
        document.documentElement.style.setProperty('--button-dark-background-hover', 'transparent');
        document.documentElement.style.setProperty('--title-color', '#fff');
        document.documentElement.style.setProperty('--color-black', '#000');
        document.documentElement.style.setProperty('--color-white', '#fff');
    }
    toggle = Boolean(toggle);
}

switcher.addEventListener('click',switchTheme);

