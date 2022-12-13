
const serverStore = require("../serverStore");


const disconnectHandler = (socket) => {
// Remove the connected user from the serverStore
// using the socket's id
serverStore.removeConnectedUser(socket.id);
};

// Export the disconnectHandler function
module.exports = disconnectHandler;
