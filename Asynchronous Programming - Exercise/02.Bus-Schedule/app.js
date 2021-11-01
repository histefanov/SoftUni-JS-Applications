function solve() {
    const infoBox = document.querySelector('#info .info');
    const departBtn = document.getElementById('depart');
    const arriveBtn = document.getElementById('arrive');

    let stop = {
        name: 'Depot',
        next: '0361'
    };

    async function depart() {
        departBtn.disabled = true;
        arriveBtn.disabled = false;

        const res = await fetch(`http://localhost:3030/jsonstore/bus/schedule/${stop.next}`);
        
        if (res.ok == false) {
            infoBox.textContent = 'Error';
            arriveBtn.disabled = true;
            return;
        }

        stop = await res.json();
        
        infoBox.textContent = `Next stop ${stop.name}`;
    }

    function arrive() {
        arriveBtn.disabled = true;
        departBtn.disabled = false;
        
        infoBox.textContent = `Arriving at ${stop.name}`;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();