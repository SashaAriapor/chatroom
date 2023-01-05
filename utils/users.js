const users = [];

// Join To chat 
function userJoin(id, username, room){
    const user = { id, username, room };

    users.push(user);

    return user;
}

// Get user 
function getUser(id) {
    return users.find(user => user.id === id);
}

// User Leave
function userLeave(id) {
    const userIndex = users.findIndex(user => user.id === id);
    
    if (userIndex !== -1) {
        return users.splice(userIndex, 1)[0];
    }
}
// Get Room 
function getRoom(room) {
    return users.filter(user => user.room === room);
}


module.exports = {
    userJoin,
    getUser,
    userLeave,
    getRoom
}