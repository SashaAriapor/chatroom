// Get At Dom
const chatForm = document.getElementById("chat__form");
const roomName = document.getElementById("room__name");
const usersList = document.getElementById("users");
const ChatMessageContainer = document.querySelector(".chat__messages");
// Get Username and Room From Url  Part
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

// Connet To the Server Part
const socket = io();

// Join Room Part

socket.emit("joinRoom", { username, room });

// Get users And room 

socket.on('roomUsers', ({room, users}) => {
    putRoomNameDom(room);
    putUsersListDom(users)
})

// Get Message Part
socket.on("message", message => {
    putMessageDom(message);

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


// Put A message to Dom Part
function putMessageDom(message){
    const div = document.createElement("div");
    div.classList.add('message');
    div.innerHTML = `
        <p class="meta">${message.username}<span> ${message.time }</span></p>
        <p class="text">${message.text}</p>`;
    document.querySelector(".chat__messages").appendChild(div);
}


// Put A RoomName to Dom
function putRoomNameDom(room){
    roomName.innerText = room;
}


// Put A UsersList to Dom
function putUsersListDom(users){
    usersList.innerHTML = `
        ${users.map(user => `<li>${user.username}</li>`).join("")}
    `
}
