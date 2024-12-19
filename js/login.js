document.addEventListener("DOMContentLoaded", ()=>{
    loginButton.addEventListener("click", async ()=>{
        const result = await login(
            username.value,
            password.value
        );
        window.location.href = "messages.html"
    });
});