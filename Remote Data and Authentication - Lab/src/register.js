window.addEventListener('load', async () => {
    const form = document.querySelector('form');

    form.addEventListener('submit', onRegister)
});

async function onRegister(ev) {
    ev.preventDefault();
    const url = 'http://localhost:3030/users/register';

    const formData = new FormData(ev.target);

    const email = formData.get('email');
    const password = formData.get('password');
    const passConfirmation = formData.get('rePass');

    try {
        if (password != passConfirmation) {
            throw new Error('Password and password confirmation need to match.');
        }

        const res = await fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password, passConfirmation })
        })

        if (res.ok != true) {
            const error = await res.json();
            throw new Error(error.message);
        }

        const data = await res.json();
        const token = data.accessToken;

        sessionStorage.setItem('token', token);

        window.location = '/index.html';
    } catch (err) {
        alert(err.message);
    }
}