const express = require("express");
const router = express.Router();

const passport = require("passport");
require("../passport");
const Posts = require("../controllers/posts");
const Comments = require("../controllers/comments");

const passportJWT = passport.authenticate("jwt", { session: false });

router.get("/", (req, res) => {
  Posts.getPosts((error, posts) => {
    if (error) {
      throw error;
    }
    res.json(posts).status(200);
  });
});

router.post("/", passportJWT, (req, res) => {
  const post = req.body;

  Posts.addPost(post, (err, post) => {
    if (err) {
      throw err;
    }
    res.json(post).status(200);
  });
});

router.get("/:_id", (req, res) => {
  Posts.getPostById(req.params._id, (err, post) => {
    if (err) {
      throw err;
    }

    res.json(post).status(200);
  });
});

router.patch("/:_id", passportJWT, (req, res) => {
  const post = req.body;
  const id = req.params._id;

  Posts.updatePost(id, post, {}, (err, post) => {
    if (err) {
      throw err;
    }
    res.json(post).status(200);
  });
});

router.delete("/:_id", passportJWT, (req, res) => {
  const id = req.params._id;

  Comments.deletePostComments(id, err => {
    if (err) {
      throw err;
    }

    res.sendStatus(200);
  });
  Posts.deletePost(id, (err, post) => {
    if (err) {
      throw err;
    }
    res.json(post);
  });
});

module.exports = router;
