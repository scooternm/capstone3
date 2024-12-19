function getMessage(m) {
    const like = m.likes.find(l => l.username==localStorage.username);
    const title = like==undefined ? "Like" : "Unlike";
    const likeId = like==undefined ? 0 : like._id
    return `
        <div data-post_id="${m._id}" class="message">
            FROM:  ${m.username}<br>\n    
            WHEN:  ${m.createdAt}<br>\n    
            TEXT:  ${m.text}<br>\n
            LIKES: ${m.likes.length}

            <button class="likeBtn btn btn-outline-primary" data-like_id="${likeId}" data-post_id="${m._id}">${title}</button>
            </div>
    `;
}
document.addEventListener("DOMContentLoaded", async () => {
    const output = document.getElementById('output');
    const messages = await getMessageList();
    output.innerHTML = messages.map(getMessage).join("<hr>\n");
    
    const likeBtns = document.querySelectorAll('.likeBtn');
    likeBtns.forEach(button => {
        button.addEventListener('click', async () => {
            const postId = button.dataset.post_id;
            const likeId = button.dataset.like_id;
            await toggleLike(postId, likeId)
            window.location.href="messages.html"
        });
    });
});

