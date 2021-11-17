window.addEventListener('load', async () => {
    const logoutBtn = document.getElementById('logoutBtn');
    logoutBtn.addEventListener('click', onLogout)
});

async function onLogout(ev) {
    const url = 'http://localhost:3030/users/logout';

    const token = localStorage.getItem('token');

    if (token == null) {
        window.location = '/login.html';
        return;
    }


    try {
        const res = await fetch(url);

        if (res.ok == false) {
            const error = await res.json();
            throw new Error(error.message)
        }

        sessionStorage.removeItem('token');

        window.location = '/index.html';
    } catch (err) {
        alert(err);
    }
}