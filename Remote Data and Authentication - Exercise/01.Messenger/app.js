function attachEvents() {
    const url = 'http://localhost:3030/jsonstore/messenger';
    const msgBox = document.getElementById('messages');
    const submitBtn = document.getElementById('submit');
    const refreshBtn = document.getElementById('refresh');
    
    const inputFields = Array.from(document.querySelectorAll('input')).slice(0, 2);
    const authorField = inputFields[0];
    const msgTextField = inputFields[1];

    submitBtn.addEventListener('click', handleSubmit);
    refreshBtn.addEventListener('click', handleRefresh);

    async function handleSubmit() {
        const author = authorField.value.trim();
        const msgText = msgTextField.value.trim();

        if (!author || !msgText) {
            alert('Please fill in both the author and the message fields.')
            return;
        }

        const newMsg = { 
            author, 
            content: msgText 
        };

        try {
            const res = await fetch(url, {
                method: 'post',
                options: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newMsg)
            });

            if (res.ok == false) {
                const error = await res.json();
            }

            authorField.value = '';
            msgTextField.value = '';
        }
        catch (err) {
            alert(err.message)
        }
    }

    async function handleRefresh() {
        try {
            const res = await fetch(url);

            if (res.ok == false) {
                throw new Error('Request could not be completed.')
            }

            const data = await res.json();
            const resultArr = [];
            
            Object.values(data).forEach((entry) => resultArr.push(`${entry.author}: ${entry.content}`));

            msgBox.value = resultArr.join('\n');
        } catch (err) {
            alert(err.message);
        }
    }
}

attachEvents();