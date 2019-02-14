const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

//Debuggers
const appConsole = require("debug")("app:startup");
const dbConsole = require("debug")("app:db");
const socketConsole = require("debug")("app:socket");
//Require Config
const config = require("config");

appConsole(`Application Name: ${config.get("name")}`);

//using mongoose for database connection
mongoose.connect("mongodb://localhost/APIAuthentication", {
  useNewUrlParser: true
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "error connection"));
db.once("open", () => {
  dbConsole("DB CONNECTED");
});
const app = express(); //init express as app
app.use(cors());

//Middlewares
if (app.get("env") === "development") {
  appConsole(`Morgan enabled`);
  app.use(morgan("dev")); //logger
}

app.use(express.json()); //body parser

//Routes
app.use("/users", require("./routes/users"));
app.use("/posts", require("./routes/posts"));
app.use("/comments", require("./routes/comments"));

//Some error
app.use((req, res, next) => {
  const error = new Error("404 NOT FOUND");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

//Start Server
const port = process.env.PORT || 5000;
const server = app.listen(port);
appConsole(`Server running at ${port}`);

//////////////////////////////////////////////////////////////////////////////////////

// WebSocket Portion
var io = require("socket.io")(server);

// Register a callback function to run when we have an individual connection
// This is run for each individual user that connects
io.sockets.on(
  "connection",
  // We are given a websocket object in our function
  function(socket) {
    socketConsole("New client: " + socket.id);

    // When this user emits, client side: socket.emit('otherevent',some data);

    socket.on("comment", async function(data) {
      // Data comes in as whatever was sent, including objects
      socketConsole("Received: 'comment' ", data);

      // Send it to all other clients
      await socket.broadcast.emit("comment", data);

      // This is a way to send to everyone including sender
      //  io.sockets.emit("comment");
    });

    socket.on("disconnect", function() {
      socketConsole("Client has disconnected");
    });
  }
);
// WebSocket Portion Ends
/////////////////////////////////////////////////////////////////////////////////////
