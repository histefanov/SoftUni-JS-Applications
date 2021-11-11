function attachEvents() {
    const dropdown = document.getElementById('posts');
    const postTitle = document.getElementById('post-title');
    const postBody = document.getElementById('post-body');
    const postComments = document.getElementById('post-comments');
    let posts;

    document.getElementById('btnLoadPosts').addEventListener('click', loadPosts);
    document.getElementById('btnViewPost').addEventListener('click', loadPostDetails);

    async function loadPosts() {
        if (dropdown.children.length > 0) {
            return;
        }

        const res = await fetch('http://localhost:3030/jsonstore/blog/posts');
        posts = await res.json();

        for (const key in posts) {
            dropdown.appendChild(createElement('option', { value: key }, posts[key].title));
        }
    }

    async function loadPostDetails() {
        postComments.replaceChildren();
        const post = posts[dropdown.value];
        
        postTitle.textContent = post.title;
        postBody.textContent = post.body;

        const res = await fetch(`http://localhost:3030/jsonstore/blog/comments`);
        const data = await res.json();

        const comments = Object.values(data).filter((c) => c.postId == dropdown.value);
        
        for (const comment of comments) {
            postComments.appendChild(createElement('li', { id: comment.id }, comment.text));
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

attachEvents();