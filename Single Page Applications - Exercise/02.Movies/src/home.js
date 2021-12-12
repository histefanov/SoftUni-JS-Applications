import { showView, e } from './dom.js';
import { showCreate } from './create.js';
import { showDetails } from './details.js';
import { showLogin } from './login.js';

let moviesCache = null;
let lastLoaded = null;
const cacheMaxAge = 60000;

const section = document.getElementById('home-page');
const catalog = section.querySelector('#movies-catalog');

section.querySelector('#create-link').addEventListener('click', (event) => {
    event.preventDefault();
    const userData = JSON.parse(sessionStorage.getItem('userData'));

    if (userData != null) {
        showCreate();
    } else {
        showLogin();
    }
})

catalog.addEventListener('click', (event) => {
    event.preventDefault();
    let target = event.target;

    if (target.tagName == 'BUTTON') {
        target = target.parentElement;
    }

    if (target.tagName == 'A') {
        const id = target.dataset.id;
        showDetails(id);
    }
})

section.remove();

export function showHome() {
    getMovies();
    showView(section);
}

async function getMovies() {
    catalog.replaceChildren(e('p', {}, 'Loading...'))

    const now = Date.now();

    if (moviesCache == null || (now - lastLoaded) > cacheMaxAge) {
        lastLoaded = now;
        const res = await fetch('http://localhost:3030/data/movies');
        const data = await res.json();
        moviesCache = data;
    }

    catalog.replaceChildren(...moviesCache.map(createMovieCard))
}

function createMovieCard(movie) {
    const element = e('div', { className: 'card mb-4' });
    element.innerHTML = `
    <img class="card-img-top" src="${movie.img}"
         alt="Card image cap" width="400">
     <div class="card-body">
         <h4 class="card-title">${movie.title}</h4>
     </div>
     <div class="card-footer">
         <a data-id="${movie._id}" href="#">
             <button type="button" class="btn btn-info">Details</button>
         </a>
     </div>`;

     return element;
}