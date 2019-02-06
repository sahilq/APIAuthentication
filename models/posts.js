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
  date: {
    type: Date,
    default: Date.now
  }
});

const Posts = (module.exports = mongoose.model("Posts", postsSche));
module.exports = Posts;
