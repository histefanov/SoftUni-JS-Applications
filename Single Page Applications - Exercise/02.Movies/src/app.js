import { showHome } from './home.js';
import { showLogin } from './login.js';
import { showRegister } from './register.js';
import { showDetails } from './details.js';
import { showEdit } from './edit.js';

const views = {
    'home-link': showHome,
    'login-link': showLogin,
    'register-link': showRegister
}

const nav = document.querySelector('nav');

document.getElementById('logout-btn').addEventListener('click', onLogout);

nav.addEventListener('click', (event) => {
    const view = views[event.target.id];
    if (typeof view == 'function') {
        event.preventDefault();
        view();
    }
});


updateNav();
showHome();

export function updateNav() {
    const userData = JSON.parse(sessionStorage.getItem('userData'));

    if (userData != null) {
        nav.querySelector('#welcome-msg').textContent = `Welcome, ${userData.email}`;
        [...nav.querySelectorAll('.logged-user')].forEach((e) => e.style.display = 'block');
        [...nav.querySelectorAll('.guest')].forEach((e) => e.style.display = 'none');
    } else {
        [...nav.querySelectorAll('.logged-user')].forEach((e) => e.style.display = 'none');
        [...nav.querySelectorAll('.guest')].forEach((e) => e.style.display = 'block');
    }
}

async function onLogout(event) {
    event.preventDefault();
    event.stopImmediatePropagation();

    const { token } = JSON.parse(sessionStorage.getItem('userData'));

    await fetch('http://localhost:3030/users/logout', {
        headers: {
            'X-Authorization': token
        }
    });

    sessionStorage.removeItem('userData');

    showLogin();
    updateNav();
}