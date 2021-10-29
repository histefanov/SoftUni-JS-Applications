function loadCommits() {
    const username = document.getElementById('username').value;
    const repo = document.getElementById('repo').value;
    const commits = document.getElementById('commits');

    fetchData();

    async function fetchData() {
        try {
            const response = await fetch(`https://api.github.com/repos/${username}/${repo}/commits`);
            if (response.ok == false) {
                throw new Error(`${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            handleResponse(data);
        } catch (error) {
            handleError(error);
        }
    }

    function handleResponse(data) {
        commits.innerHTML = '';
        console.log(data);

        for (const { commit } of data) {
            const liElem = document.createElement('li');
            liElem.innerHTML = `<li>${commit.author.name}: ${commit.message}</li>`

            commits.appendChild(liElem);
        }
    }

    function handleError(error) {
        commits.innerHTML = '';
        commits.textContent = `${error.message}`;
    }
}