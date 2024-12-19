document.addEventListener("DOMContentLoaded", ()=>{
    signupBtn.addEventListener("click",async ()=>{
        const result = await signUp(
            username.value,
            fullname.value,
            password.value
        );
        if("Conflict" === result){
            output.innerText = "Username already taken.";
            return;
        }
        window.location.href = "login.html";
    });
});