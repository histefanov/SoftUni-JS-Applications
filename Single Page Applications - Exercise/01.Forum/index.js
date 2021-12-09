const url = 'http://localhost:3030/jsonstore/collections/myboard/posts';

async function createPost() {
    const res = await fetch(url, {
        method: 'post',
        headers: { 
            'Content-Type': 'application/json'
        }
    })
}