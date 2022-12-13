
const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const socketServer = require('./socketServer')

const authRoutes = require('./routes/authRoutes/authRoutes.js')

// get the port number to listen on from the environment
const PORT = process.env.PORT || process.env.API_PORT

// create an express app
const app = express();

// parse JSON bodies in incoming requests
app.use(express.json());

// enable CORS for all incoming requests
app.use(cors());

// register the auth routes with the app
app.use("/api/auth", authRoutes);

// create an HTTP server using the express app
const server = http.createServer(app);

// register the socket server with the HTTP server
socketServer.registerSocketServer(server);

// connect to the database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // start the server
    server.listen(PORT, () => {
      console.log(`Server is listening on ${PORT}`)
    });
  })
  .catch((err) => {
    // log an error message and exit if the database connection fails
    console.log("database connection failed. Server not started");
    console.error(err);
  });


