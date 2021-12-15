import { html } from '../lib.js';
import { getAllMemes } from '../api/data.js';

const profileTemplate = (memes) => html`
<section id="user-profile-page" class="user-profile">
    <article class="user-info">
        <img id="user-avatar-url" alt="user-profile" src="/images/female.png">
        <div class="user-content">
            <p>Username: Mary</p>
            <p>Email: mary@abv.bg</p>
            <p>My memes count: 2</p>
        </div>
    </article>
    <h1 id="user-listings-title">User Memes</h1>
    <div class="user-meme-listings">
        <!-- Display : All created memes by this user (If any) -->
        <div class="user-meme">
            <p class="user-meme-title">Java Script joke</p>
            <img class="userProfileImage" alt="meme-img" src="/images/1.png">
            <a class="button" href="#">Details</a>
        </div>
        <div class="user-meme">
            <p class="user-meme-title">Bad code can present some problems</p>
            <img class="userProfileImage" alt="meme-img" src="/images/3.png">
            <a class="button" href="#">Details</a>
        </div>
        <!-- Display : If user doesn't have own memes  -->
        <p class="no-memes">No memes in database.</p>
    </div>
</section>`;

const memeCard = (meme) => html`
<div class="meme">
    <div class="card">
        <div class="info">
            <p class="meme-title">${meme.title}</p>
            <img class="meme-image" alt="meme-img" src=${meme.imageUrl}>
        </div>
        <div id="data-buttons">
            <a class="button" href="/details/${meme._id}">Details</a>
        </div>
    </div>
</div>
`;

export async function profilePage(ctx) {
    const memes = await getAllMemes();
    ctx.render(profileTemplate(memes));
}