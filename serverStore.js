
const connectedUsers = new Map();

let io = null;

const setSocketServerInstance = (ioInstance) => {
  io = ioInstance;
};

const getSocketServerInstance = () => {
  return io;
};

const addNewConnectedUser = ({ socketId, userID }) => {
  // Check if a user with the given userID already exists
  let duplicateUserExists = false;
  connectedUsers.forEach((value, key) => {
    if (value.userID === userID) {
      // Remove the duplicate user
      connectedUsers.delete(key);
      duplicateUserExists = true;
    }
  });

  // Add the new user
  connectedUsers.set(socketId, { userID });
  console.log("new connected users");
  console.log(connectedUsers);
};



const removeConnectedUser = (socketId) => {
  if (connectedUsers.has(socketId)) {
    connectedUsers.delete(socketId);
    console.log("new connected users");
    console.log(connectedUsers);
  }
};

const getActiveConnections = (userID) => {
  const activeConnections = [];

  connectedUsers.forEach(function (value, key) {
    if (value.userID === userID) {
      activeConnections.push(key);
    }
  });

  return activeConnections;
};

const getOnlineUsers = () => {
  const onlineUsers = [];

  connectedUsers.forEach((value, key) => {
    onlineUsers.push({ socketId: key, userID: value.userID });
  });

  return onlineUsers;
};

module.exports = {
  addNewConnectedUser,
  removeConnectedUser,
  getActiveConnections,
  setSocketServerInstance,
  getSocketServerInstance,
  getOnlineUsers,
};