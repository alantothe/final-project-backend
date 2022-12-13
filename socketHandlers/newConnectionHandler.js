const serverStore = require("../serverStore");


const newConnectionHandler = async (socket, io) => {
  const userDetails = socket.user;

  serverStore.addNewConnectedUser({
    socketId: socket.id,
    userID: userDetails.userID,
  });


};

module.exports = newConnectionHandler;