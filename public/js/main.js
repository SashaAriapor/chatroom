// Get At Dom
const chatForm = document.getElementById("chat__form");
const ChatMessageContainer = document.querySelector(".chat__messages");

// Connet To the Server
const socket = io();


// Get Message Part
socket.on("message", message => {
    messageDomCreator(message);

    // Scroll Down 
    ChatMessageContainer.scrollTop = ChatMessageContainer.scrollHeight;
})

// Send Meesage Part
chatForm.addEventListener('submit', (e) => {
    // Get Text Message From Send Input
    e.preventDefault();
    let msg = e.target.elements.msg.value;
    msg = msg.trim();  
    if (!msg) {
      return false;
    }
    // Emit Message To Server
    socket.emit("chatMessage", msg);
    // Clear input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
});


// Put A message to Dom
function messageDomCreator(message){
    const div = document.createElement("div");
    div.classList.add('message');
    div.innerHTML = `
        <p class="meta">Mary <span>9:15pm</span></p>
        <p class="text">${message}</p>`;
    document.querySelector(".chat__messages").appendChild(div);
}
