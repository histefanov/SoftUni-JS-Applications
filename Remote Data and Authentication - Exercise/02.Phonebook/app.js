const url = 'http://localhost:3030/jsonstore/phonebook';
const phonesBox = document.getElementById('phonebook');
const personField = document.getElementById('person');
const phoneField = document.getElementById('phone');

function attachEvents() {
    document.getElementById('btnLoad').addEventListener('click', handleLoad);
    document.getElementById('btnCreate').addEventListener('click', handleCreate);
}

async function handleLoad() {
    phonesBox.replaceChildren();

    const res = await fetch(url);
    const data = await res.json();

    Object.values(data).forEach((e) => phonesBox.appendChild(createEntry(e)));
}

async function handleCreate() {
    const newPerson = personField.value.trim();
    const newPhone = phoneField.value.trim();

    if (!newPerson || !newPhone) {
        alert('Both the person and phone fields must be filled in.');
    }

    const data = {
        person: newPerson,
        phone: newPhone
    }

    const res = await fetch(url, {
        method: 'post',
        options: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    const entry = await res.json();

    personField.value = '';
    phoneField.valuie = '';
    phonesBox.appendChild(createEntry(entry));
}

async function handleDelete(ev) {
    const id = ev.target.parentElement.id;

    const res = await fetch(`${url}/${id}`, {
        method: 'delete'
    })

    const deletedEntry = await res.json();

    Array.from(phonesBox.children).find((e) => e.id == deletedEntry._id).remove();
}

function createEntry(data) {
    const li = document.createElement('li');
    li.id = data._id;

    const txt = document.createElement('span');
    txt.textContent = `${data.person}: ${data.phone}`;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', handleDelete);

    li.appendChild(txt);
    li.appendChild(deleteBtn);

    return li;
}

attachEvents();