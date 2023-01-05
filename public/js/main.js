// Get At Dom

const chatForm = document.getElementById("chat__form");

// Connect To server
const socket = io();
socket.on("message", message => {
    console.log(message);
})

// Send Meesage Part
chatForm.addEventListener('submit', (e) => {
    // Get Text Message From Send Input
    e.preventDefault();
    let msg = e.target.elements.msg.value;
    console.log(msg);
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
