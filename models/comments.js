const mongoose = require("mongoose");

const commentsSche = mongoose.Schema({
  postId: {
    type: mongoose.Schema.ObjectId,
    ref: "posts",
    require: true,
    foreignField: true
  },
  userId: {
    type: "string",
    require: true
  },
  userName: {
    type: "string",
    require: true
  },
  body: {
    type: "string",
    require: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const comments = (module.exports = mongoose.model("comments", commentsSche));
module.exports = comments;
