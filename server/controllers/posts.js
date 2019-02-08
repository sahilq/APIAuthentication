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
    await Posts.findOneAndUpdate(query, update, options, callback);
  },
  likePost: async (id, user, options, callback) => {
    const query = { _id: id };
    console.log("COntroller");
    console.log("user is", user);
    await Posts.findByIdAndUpdate(
      query,
      { $push: { likedList: user } },
      options,
      callback
    );
    console.log("outof controller");
  },
  unlikePost: async (id, user, options, callback) => {
    const query = { _id: id };
    console.log("COntroller");
    console.log("user is", user);
    await Posts.findByIdAndUpdate(
      query,
      { $pull: { likedList: user } },
      options,
      callback
    );
    console.log("outof controller");
  }
};
