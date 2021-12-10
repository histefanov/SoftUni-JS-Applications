import { showView } from './dom.js';

const section = document.getElementById('movie-details');
section.remove();

export function showDetails(id) {
    showView(section);
}

async function getMovie(id) {
    const res = await fetch('http://localhost:3030/data/movies/' + id);
    const data = res.json();

    return data;
}

