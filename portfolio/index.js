



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

console.log(`Вёрстка соответствует макету. Вёрстка соответствует макету. Ширина экрана 768px +48
Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки.
Весь контент страницы при этом сохраняется: не обрезается и не удаляется. Фоновые изображения,
добавляемые свойством background-image, к контенту не относятся, их можно обрезать +15
На ширине экрана 768рх и меньше реализовано адаптивное меню

(При ширине экрана 768-620рх вёрстка меню соответствует макету, когда экран становится уже, меню занимает всю ширину экрана -
Реализовано частично, так как не смог полноценно проверить этот пункт на pixel perfect при разрешениях от 768 до 620: 
При включении расширения с открытым меню оно смещается относительно своего положения.
Реализовал через относительные величины) 

+20 
Итог: 83`);