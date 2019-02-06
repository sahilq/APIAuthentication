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
// module.exports.getComments = async (callback, limit) => {
//   await comments.find(callback).limit(limit);
// };

// module.exports.addComment = async (comment, callback) => {
//   await comments.create(comment, callback);
// };

// module.exports.deleteComment = async (id, callback) => {
//   const query = { _id: id };
//   await comments.deleteOne(query, callback);
// };

// module.exports.deletePostComments = async (id, callback) => {
//   const query = { postId: id };
//   const found = comments.find(query);
//   if (found) {
//     console.log("FOUND COMMENTS");
//     await comments.deleteMany(query);
//   } else {
//     console.log("NO COMMENTS FOUND");
//   }
// };
