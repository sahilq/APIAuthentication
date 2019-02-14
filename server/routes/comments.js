const express = require("express");
const router = express.Router();
const passport = require("passport");

require("../passport");

const Comments = require("../controllers/comments");

//validation
const { validateBody, schemas } = require("../helper/routeHelpers");

const passportJWT = passport.authenticate("jwt", { session: false });

router.get("/", (req, res) => {
  Comments.getComments((error, comments) => {
    if (error) {
      throw error;
    }
    res.json(comments).status(200);
  });
});

router.post(
  "/",
  validateBody(schemas.commentSchema),
  passportJWT,
  (req, res) => {
    const comment = req.body;

    Comments.addComment(comment, (err, comment) => {
      if (err) {
        throw err;
      }
      res.json(comment).status(200);
    });
  }
);

// router.get("/:_id", (req, res) => {
//   Comments.getCommentById(req.params._id, (err, comment) => {
//     if (err) {
//       throw err;
//     }
//     res.json(comment);
//   });
// });

// router.patch("/:_id", (req, res) => {
//   console.log(req.params._id);
//   const comment = req.body;
//   const id = req.params._id;
//   Comments.updateComment(id, comment, {}, (err, comment) => {
//     if (err) {
//       throw err;
//     }
//     res.json(comment);
//   });
// });

router.delete("/:_id", passportJWT, (req, res) => {
  const id = req.params._id;
  Comments.deleteComment(id, (err, comment) => {
    if (err) {
      throw err;
    }
    res.json(comment);
  });
});

module.exports = router;
