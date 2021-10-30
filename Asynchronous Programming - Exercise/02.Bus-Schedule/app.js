function solve() {
    const infoBox = document.querySelector('#info .info');

    let stop = {
        name: 'Depot',
        next: '0361'
    };

    async function depart() {
        const nextStop = await fetch(`http://localhost:3030/jsonstore/bus/schedule/${stop.next}`);
        
    }

    function arrive() {
        console.log('Arrive TODO...');
    }

    return {
        depart,
        arrive
    };
}

let result = solve();