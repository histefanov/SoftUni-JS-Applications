import { getBookById, deleteById, getTotalLikes, userHasLikedBook, like } from '../api/data.js';
import { html } from '../lib.js';
import { getUserData } from '../util.js';

const detailsTemplate = (book, isOwner, onDelete, totalLikes, canLike, onLike) => html`
<section id="details-page" class="details">
    <div class="book-information">
        <h3>${book.title}</h3>
        <p class="type">Type: ${book.type}</p>
        <p class="img"><img src=${book.imageUrl}></p>
        <div class="actions">
            <!-- Edit/Delete buttons ( Only for creator of this book )  -->
            ${
                isOwner
                ? html`
                    <a class="button" href="/edit/${book._id}">Edit</a>
                    <a @click=${onDelete} class="button" href="javascript:void(0)">Delete</a>`
                : null
            }

            <!-- Bonus -->
            <!-- Like button ( Only for logged-in users, which is not creators of the current book ) -->
            ${canLike ? html`<a @click=${onLike} class="button" href="javascript:void(0)">Like</a>` : null}

            <!-- ( for Guests and Users )  -->
            <div class="likes">
                <img class="hearts" src="/images/heart.png">
                <span id="total-likes">Likes: ${totalLikes}</span>
            </div>
            <!-- Bonus -->
        </div>
    </div>
    <div class="book-description">
        <h3>Description:</h3>
        <p>${book.description}</p>
    </div>
</section>`;

export async function detailsPage(ctx) {
    const book = await getBookById(ctx.params.id);
    const totalLikes = await getTotalLikes(ctx.params.id);

    const userData = getUserData();
    const isOwner = userData && book._ownerId == userData.id;
    
    const hasLiked = userData && await userHasLikedBook(ctx.params.id, userData.id);
    const canLike = userData && !isOwner && !hasLiked;

    ctx.render(detailsTemplate(book, isOwner, onDelete, totalLikes, canLike, onLike));

    async function onDelete() {
        const choice = confirm('Are you sure you want to delete this book?');

        if (choice) {
            await deleteById(ctx.params.id);
            ctx.page.redirect('/');
        }
    }

    async function onLike() {
        await like(ctx.params.id);
        ctx.page.redirect('/details/' + ctx.params.id);
    }
}