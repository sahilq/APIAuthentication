const Posts = require("../models/posts");
module.exports = {
  getPosts: async (callback, limit) => {
    await Posts.find(callback).limit(limit);
  },

  getPostById: async (id, callback) => {
    await Posts.findById(id, callback);
  },

  addPost: async (post, callback) => {
    await Posts.create(post, callback);
  },

  deletePost: async (id, callback) => {
    const query = { _id: id };
    try {
      await Posts.deleteOne(query, callback);
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  },

  updatePost: async (id, post, options, callback) => {
    const query = { _id: id };
    const update = {
      title: post.title,
      article: post.article
    };
    await Posts.findByIdAndUpdate(query, update, options, callback);
  }
};
