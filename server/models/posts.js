const mongoose = require("mongoose");

const postsSche = mongoose.Schema({
  title: {
    type: "string",
    require: true
  },
  article: {
    type: "string",
    require: true
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "users",
    require: true,
    foreignField: true
  },
  userName: {
    type: "string",
    require: true
  },
  likedList: { type: Array, default: [] }, //change this
  date: {
    type: Date,
    default: Date.now
  }
});

const Posts = mongoose.model("Posts", postsSche);
module.exports = Posts;
