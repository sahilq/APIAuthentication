const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

mongoose.connect("mongodb://localhost/APIAuthentication", {
  useNewUrlParser: true
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "error connection"));
db.once("open", () => {
  console.log("DB CONNECTED");
});
const app = express();
app.use(cors());
//Middlewares
app.use(morgan("dev"));
app.use(express.json());

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
console.log(`Server running at ${port}`);

///////////////////////////////////////////////////////////////////////////////////////////////

// WebSocket Portion
var io = require("socket.io")(server);

// Register a callback function to run when we have an individual connection
// This is run for each individual user that connects
io.sockets.on(
  "connection",
  // We are given a websocket object in our function
  function(socket) {
    console.log("We have a new client: " + socket.id);

    // When this user emits, client side: socket.emit('otherevent',some data);

    socket.on("comment", function() {
      // Data comes in as whatever was sent, including objects
      console.log("Received: 'comment' ");

      // Send it to all other clients
      // socket.broadcast.emit("comment");

      // This is a way to send to everyone including sender
      io.sockets.emit("comment");
    });

    socket.on("disconnect", function() {
      console.log("Client has disconnected");
    });
  }
);
