function getMessage(m) {
    return `
        <div data-post_id="${m._id}" class="message">
            FROM:  ${m.username}<br>\n    
            WHEN:  ${m.createdAt}<br>\n    
            TEXT:  ${m.text}<br>\n
            LIKES: ${m.likes.length}
        </div>
    `;
}
document.addEventListener("DOMContentLoaded", async () => {

    const messages = await getMessageList();
    output.innerHTML = messages.map(getMessage).join("<hr>\n")

});//end load