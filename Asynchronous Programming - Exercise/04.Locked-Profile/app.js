async function lockedProfile() {
    const profilesDiv = document.getElementById('main');

    const res = await fetch('http://localhost:3030/jsonstore/advanced/profiles');
    const data = await res.json();

    for (const id in data) {
        const profileData = data[id];
        const profile = document.createElement('div');

        profile.className = 'profile';
        profile.innerHTML = `<img src="./iconProfile2.png" class="userIcon" />
				<label>Lock</label>
				<input type="radio" name="${id}Locked" value="lock" checked>
				<label>Unlock</label>
				<input type="radio" name="${id}Locked" value="unlock"><br>
				<hr>
				<label>Username</label>
				<input type="text" name="user1Username" value="${profileData.username}" disabled readonly />
				<div id="user1HiddenFields">
					<hr>
					<label>Email:</label>
					<input type="email" name="user1Email" value="${profileData.email}" disabled readonly />
					<label>Age:</label>
					<input type="email" name="user1Age" value="${profileData.age}" disabled readonly />
				</div>
				<button>Show more</button>`;

        profile.querySelector('button').addEventListener('click', (ev) => {
            const isLocked = ev.target.parentElement.querySelector('input').checked;

            if (!isLocked) {
                if (ev.target.textContent == 'Show more') {
                    ev.target.parentElement.querySelector('div').style.display = 'block';
                    ev.target.textContent = 'Hide it';
                } else {
                    ev.target.parentElement.querySelector('div').style.display = 'none';
                    ev.target.textContent = 'Show more';
                }
            }
        })

        profilesDiv.appendChild(profile);
    }
}

/*
<div class="profile">
				<img src="./iconProfile2.png" class="userIcon" />
				<label>Lock</label>
				<input type="radio" name="user1Locked" value="lock" checked>
				<label>Unlock</label>
				<input type="radio" name="user1Locked" value="unlock"><br>
				<hr>
				<label>Username</label>
				<input type="text" name="user1Username" value="" disabled readonly />
				<div id="user1HiddenFields">
					<hr>
					<label>Email:</label>
					<input type="email" name="user1Email" value="" disabled readonly />
					<label>Age:</label>
					<input type="email" name="user1Age" value="" disabled readonly />
				</div>
				<button>Show more</button>
			</div>
*/

