async function getInfo() {
    const inputId = document.getElementById('stopId').value.trim();
    const stopName = document.getElementById('stopName');
    const buses = document.getElementById('buses');
    const btn = document.getElementById('submit');

    btn.disabled = true;

    try {
        stopName.textContent = 'Loading...';
        buses.replaceChildren();

        const res = await fetch(`http://localhost:3030/jsonstore/bus/businfo/${inputId}`);

        if (res.status != 200 || inputId == '') {
            throw new Error('Invalid stop ID');
        }
        
        const data = await res.json();

        stopName.textContent = data.name;

        Object.entries(data.buses).forEach((b) => {
            const li = document.createElement('li');
            li.textContent = `Bus ${b[0]} arrives in ${b[1]} minutes`;
            buses.appendChild(li);
        })

    } catch (error) {
        stopName.textContent = 'Error';
    }

    btn.disabled = false;
}