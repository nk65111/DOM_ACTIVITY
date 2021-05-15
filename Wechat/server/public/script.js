let chatInput=document.querySelector(".chat-input");
let chatWindow=document.querySelector(".chat-window");
let username = prompt("Enter Your Name ");
chatInput.addEventListener("keypress",function(e){
    if(e.key=="Enter"){
        let mechat=document.createElement("div");
        mechat.classList.add("chat");
        mechat.classList.add("right");
        mechat.textContent=username+" : "+chatInput.value;
        chatWindow.append(mechat);
        chatInput.value="";

    }
})