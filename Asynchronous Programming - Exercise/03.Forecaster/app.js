function attachEvents() {
    const locationInput = document.getElementById('location');
    const submitBtn = document.getElementById('submit');
    const forecastDiv = document.getElementById('forecast');
    const currentConditionsDiv = document.getElementById('current');
    const upcomingConditionsDiv = document.getElementById('upcoming');

    const symbolMapper = {
        'Sunny': '\u2600',
        'Partly sunny': '\u26C5',
        'Overcast': '\u2601',
        'Rain': '\u2602'
    }

    submitBtn.addEventListener('click', getWeather);

    async function getWeather(ev) {  
        forecastDiv.style.display = 'block';

        const res = await fetch(`http://localhost:3030/jsonstore/forecaster/locations`);
        const data = await res.json();

        const location = data.find((loc) => loc.name == locationInput.value);

        if (location == undefined) {
            currentConditionsDiv.appendChild(createElement('p', {}, 'Error'));
            upcomingConditionsDiv.appendChild(createElement('p', {}, 'Error'));
            return;
        }

        getCurrentConditions(location.code); 
    }

    async function getCurrentConditions(code) {
        const res = await fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${code}`);
        const data = await res.json();

        const forecast = createElement('div', { className: 'forecasts' }, 
            createElement('span', { className: 'condition symbol'}, symbolMapper[data.forecast.condition]),
            createElement('span', { className: 'condition' },
                createElement('span', { className: 'forecast-data'}, data.name),
                createElement('span', { className: 'forecast-data'}, `${data.forecast.low}\u00B0/${data.forecast.high}\u00B0`),
                createElement('span', { className: 'forecast-data'}, data.forecast.condition)
            )
        );

        currentConditionsDiv.appendChild(forecast);
        console.log(forecast);
    }

    async function getUpcomingConditions(code) {
        const res = await fetch(`http://localhost:3030/jsonstore/forecaster/today/${code}`);
        const data = await res.json();
    }

    function createElement(tagName, atts, ...content) {
        const element = document.createElement(tagName);

        for (const att in atts) {
            element[att] = atts[att];
        }

        for (let item of content) {
            if (typeof item == 'string' || typeof item == 'number') {
                item = document.createTextNode(item);
            }
            element.appendChild(item);
        }

        return element;
    }
}

attachEvents();