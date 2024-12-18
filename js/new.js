
document.addEventListener("DOMContentLoaded",()=>{

    sendTextButton.addEventListener("click",async ()=>{
        await sendText(sendMsg.value);  
        window.location.href = "messages.html";
    });

});//end loaded