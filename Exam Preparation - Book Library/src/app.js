import { render, page } from './lib.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { getBookById, logout } from './api/data.js';
import { dashboardPage } from './views/dashboard.js';
import { addPage } from './views/add.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { getUserData } from './util.js';

/*debug*/
import * as api from './api/api.js';
import { myBooksPage } from './views/myBooks.js';
window.api = api;
window.getById = getBookById;
/*debug*/

const root = document.getElementById('site-content');
document.getElementById('logoutBtn').addEventListener('click', onLogout);

page(decorateContext);
page('/', dashboardPage);
page('/login', loginPage);
page('/register', registerPage);
page('/add', addPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);
page('/mybooks', myBooksPage);

updateUserNav();
page.start();

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.updateUserNav = updateUserNav;

    next();
}

function onLogout() {
    logout();
    updateUserNav();
    page.redirect('/');
}

function updateUserNav() {
    const userData = getUserData();

    if (userData) {
        document.getElementById('user').style.display = 'block';
        document.getElementById('guest').style.display = 'none';
        document.querySelector('#user span').textContent = `Welcome, ${userData.email}`;
    } else {
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = 'block';
    }
}
