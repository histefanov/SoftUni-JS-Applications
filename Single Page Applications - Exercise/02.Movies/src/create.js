import { showView } from './dom.js';
import { showHome } from './home.js';

const section = document.getElementById('add-movie');
const form = section.querySelector('form');
form.addEventListener('submit', onCreate);
section.remove();

export function showCreate() {
    showView(section);
}

async function onCreate(event) {
    event.preventDefault();
    const formData = new FormData(form);

    const title = formData.get('title').trim();
    const description = formData.get('description').trim();
    const img = formData.get('imageUrl').trim();

    try {
        if (title.length == 0 || description.length == 0 || img.length == 0) {
            throw new Error('All input fields must be filled.');
        }

        const userData = JSON.parse(sessionStorage.getItem('userData'));
        const res = await fetch('http://localhost:3030/data/movies', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': userData.token
            },
            body: JSON.stringify({ title, description, img })
        });

        const data = await res.json();

        showHome();
    } catch (err) {
        alert(err.message);
    }
}