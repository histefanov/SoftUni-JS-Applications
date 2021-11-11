async function solution() {
    const mainSection = document.getElementById('main');

    const res = await fetch('http://localhost:3030/jsonstore/advanced/articles/list');
    const titles = await res.json();

    for (const title of titles) {
        mainSection.appendChild(
            createElement('div', { class: 'accordion' }, 
                createElement('div', { class: 'head' }, 
                    createElement('span', {}, title.title),
                    createElement('button', { class: 'button', id: title._id }, 'More')),
                createElement('div', { class: 'extra' })
        ))
    }

    mainSection.addEventListener('click', handleClick);

    async function handleClick(ev) {
        if (ev.target.tagName == 'BUTTON') {
            const infoBox = ev.target.parentElement.parentElement.lastElementChild;

            if (ev.target.textContent == 'More') {
                if (infoBox.children.length == 0) {
                    const detailsRes = await fetch(`http://localhost:3030/jsonstore/advanced/articles/details/${ev.target.id}`);
                    const data = await detailsRes.json();

                    infoBox.appendChild(createElement('p', {}, data.content));
                }

                infoBox.style.display = 'block';
                ev.target.textContent = 'Less';
            } else {
                infoBox.style.display = 'none';
                ev.target.textContent = 'More';
            }
        }
    }

    function createElement(tagName, atts, ...content) {
        const el = document.createElement(tagName);

        for (const att in atts) {
            el.setAttribute(att, atts[att]);
        }

        for (let item of content) {
            if (typeof item == 'string' || typeof item == 'number') {
                item = document.createTextNode(item);
            }
            el.appendChild(item);
        }

        return el;
    }
}

solution();