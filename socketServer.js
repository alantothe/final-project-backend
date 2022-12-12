const registerSocketServer = (server) => {
    // import the socket.io library
    const io = require('socket.io')(server, {
      // specify CORS options for incoming connections
      cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
      }
    });

    // listen for incoming connections
    io.on('connections', (socket) => {
      // log a message and the socket ID when a user connects
      console.log("user connected");
      console.log(socket.id);
    });
  };

  module.exports = {
    registerSocketServer,
  };