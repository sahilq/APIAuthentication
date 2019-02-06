const comments = require("../models/comments");

module.exports = {
  getComments: async (callback, limit) => {
    await comments.find(callback).limit(limit);
  },

  addComment: async (comment, callback) => {
    await comments.create(comment, callback);
  },

  deleteComment: async (id, callback) => {
    const query = { _id: id };
    await comments.deleteOne(query, callback);
  },

  deletePostComments: async (id, callback) => {
    const query = { postId: id };
    const found = comments.find(query);
    if (found) {
      console.log("FOUND COMMENTS");
      await comments.deleteMany(query);
    } else {
      console.log("NO COMMENTS FOUND");
    }
  }
};
