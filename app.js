
/*data download*/
// const TMDB_API_KEY = 'api_key=9012a3cfced9963877aeb95eb5fa8f78';
const TMDB_API_KEY = 'api_key=3fd2be6f0c70a2a598f084ddfb75487c&query=spring';
const TMDB_URL = 'https://api.themoviedb.org/3';
const POP_URL = `${TMDB_URL}/discover/movie?sort_by=popularity.desc&${TMDB_API_KEY}`
const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500/';
const SEARCH_URL = `${TMDB_URL}/search/movie?${TMDB_API_KEY}`;
const movieWrapper = document.querySelector('.movie-wrapper');
/*search*/
const searchForm = document.getElementById('form');
const searchInput = document.querySelector('.search-input');
const searchCross = document.querySelector('.cross-wrapper');
const noResults = document.querySelector('.no-results');
let queryPage = 1
let isSearch = null;
let searchInputValue = '';
/*pagination*/
const previousPageButton = document.querySelector('.previous-page');
const nextPageButton = document.querySelector('.next-page');
const currentPageCounter = document.querySelector('.current-page');
let currentPage = 1;
let currentURL = null;
let totalPages = null;
/*infinite load*/
const footer = document.querySelector('.footer');
const infiniteSwitcherSlider = document.querySelector('.slider-infinite-scroll');
const infiniteSwitcherLabel = document.querySelector('.label-infinite-scroll');
const infiniteSwitcher = document.querySelector('.switch-infinite-scroll');
const paginationBlock = document.querySelector('.pagination');
const checkboxInfiniteScroll = document.querySelector('.checkbox-infinite-scroll');
const headerLogo = document.querySelector('.header-logo');

let isFinite = true;

getMovies(POP_URL);


searchCross.addEventListener('click',() =>{
     searchInput.value = '';
});

// headerLogo.addEventListener('click',()=>{
//     checkboxInfiniteScroll.checked=false;
//     infiniteObserver.unobserve(footer);
// })

function clearWindow() {
    movieWrapper.querySelectorAll('.movie').forEach((item)=>item.remove());
}

function smoothScrollIntoView() {
    clearWindow();
    searchForm.scrollIntoView();
    getMovies(currentURL);
    // searchForm.scrollIntoView({behavior : 'smooth'});
    // setTimeout(()=>clearWindow(),1000);
    // setTimeout(()=>getMovies(currentURL), 1000);
}


function getGenres(arr) {
    let res = arr.reduce(function(res,item){
        switch (item) {
            case 28: return res + "Action/";
            case 12: return res + "Adventure/";
            case 16: return res + "Animation/";
            case 35: return res + "Comedy/";
            case 80: return res + "Crime/";
            case 99: return res + "Documentary/";
            case 18: return res + "Drama/";
            case 10751: return res + "Family/";
            case 14: return res + "Fantasy/";
            case 36: return res + "History/";
            case 27: return res + "Horror/";
            case 10402: return res + "Music/";
            case 9648: return res + "Mystery/";
            case 10749: return res + "Romance/";
            case 878: return res + "Science Fiction/";
            case 10770: return res + "TV Movie/";
            case 53: return res + "Thriller/";
            case 10752: return res + "War/";
            case 37: return res + "Western/";
            default: return res;
          }
    },'');
    return (res) ? res.slice(0,res.length-1) : '';
}



function showMovies(data) {
    data.forEach(movie => {
        const newMovie = document.createElement('div');
        newMovie.classList.add('movie');
        newMovie.innerHTML = `
        <img class="movie-img" src=${(movie.poster_path) ? `${IMAGE_BASE}${movie.poster_path}` : './img/no-poster-found.jpg'}>
        <h2 class="movie-title">${movie.title}</h2>
        <div class="movie-category">${getGenres(movie.genre_ids)}</div>
        <div class="movie-description">
            <h3>Plot</h3>
            ${(movie.overview) ? movie.overview : 'There is no description.'}
        </div>
        <div class="movie-mark ${(movie.vote_average>7) ? 'green' : (movie.vote_average>5) ? 'yellow' : 'red'}">${(movie.vote_average>0 && movie.vote_average<=10) ? movie.vote_average : 'N/A'}</div>
         <div class="dark"></div> 
        `;
        movieWrapper.appendChild(newMovie);
        newMovie.addEventListener('click',function(){// this.classList.toggle('rotate');
                                                    this.querySelector('.movie-description').classList.toggle('rotate');});
        newMovie.addEventListener('mouseover', function(){this.querySelector('.dark').classList.add('visible');});
        newMovie.addEventListener('mouseout', function(){this.querySelector('.dark').classList.remove('visible');});
    });
}

async function getMovies(url) {
    noResults.classList.remove('visible');
    previousPageButton.classList.remove('invisible');
    nextPageButton.classList.remove('invisible');
    currentURL = url;
    let res = null;
    let data = null;
    let i = 0;
    do{
        res = await fetch(`${url}&page=${queryPage}`);
        data = await res.json();
    // console.log(res);
        console.log(data);
        await showMovies(data.results);
        (++i<3 && (data.page < data.total_pages)) ? queryPage++ : queryPage;
    }
    while(i<3 && (data.page < data.total_pages))
    
    totalPages = data.total_pages;

    if(queryPage === totalPages || totalPages === 0){
        nextPageButton.classList.add('invisible');
    }

    if(queryPage <= 3){
        previousPageButton.classList.add('invisible')
    }

    if(movieWrapper.querySelectorAll('.movie').length) {
        (data.page < data.total_pages && !isFinite) ? infiniteObserver.observe(footer)
                                                    : infiniteObserver.unobserve(footer);
    }
    else {
        noResults.classList.add('visible');
    }

}


/*infinite page*/

 const infiniteObserver = new IntersectionObserver(([entery], observer) => {
		if (entery.isIntersecting) {
			observer.unobserve(entery.target);
            if( !(queryPage === totalPages)){
                queryPage++
                currentPage++;
                currentPageCounter.innerHTML = currentPage;
                if (isSearch) {
                    if(searchInputValue)
                        getMovies(`${SEARCH_URL}&query=${searchInputValue}`);
                    else
                        queryPage--;
                } else {
                    getMovies(POP_URL)
                }
            }
		}

	},  {threshold: 1});


infiniteSwitcherSlider.addEventListener('click', () => {
    infiniteSwitcherLabel.innerHTML = `Turn ${(isFinite) ? (isFinite = false, 'off') : (isFinite = true, 'on')} infinite load`;
    if(isFinite) {
         paginationBlock.classList.remove('invisible');
         infiniteSwitcher.classList.remove('pagination-is-invisible');
         if(queryPage < totalPages) {
            infiniteObserver.unobserve(footer);
            queryPage -=2;
            smoothScrollIntoView();
         }
    } else {
        console.log(queryPage)
        console.log(totalPages)
        if(queryPage < totalPages){
            setTimeout(()=>infiniteObserver.observe(footer), 1000);
        }
            paginationBlock.classList.add('invisible');
            infiniteSwitcher.classList.add('pagination-is-invisible');
    }
})





/*search*/

searchForm.onsubmit = async (event) => {
    event.preventDefault();
    if(searchInput.value){
        searchInputValue = searchInput.value;
        // checkboxInfiniteScroll.checked=false;
        // infiniteObserver.unobserve(footer);
        clearWindow();
        queryPage = 1;
        currentPage = 1;
        currentPageCounter.innerHTML = 1;
        isSearch = true;
        getMovies(`${SEARCH_URL}&query=${searchInputValue}`);
    }
    
  };






/*Pagination*/

  previousPageButton.addEventListener('click', () => {
    if(queryPage>=6){ 
        queryPage -= 5 
     } else if(queryPage == 5) {
        queryPage -= 4 
     } else if(queryPage == 4){
        queryPage-= 3;
     } else {
         return;
     }
    currentPage--;
    currentPageCounter.innerHTML = currentPage;
    smoothScrollIntoView();
  })
  
  nextPageButton.addEventListener('click', () => {
    if(!(queryPage === totalPages)) {
        queryPage++;
        currentPage++;
        currentPageCounter.innerHTML = currentPage;
        smoothScrollIntoView();
    }
  })


  
  
