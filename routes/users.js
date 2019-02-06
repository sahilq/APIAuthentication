const express = require("express");
const router = require("express-promise-router")();
const passport = require("passport");
require("../passport");

const { validateBody, schemas } = require("../helper/routeHelpers");
const User = require("../controllers/users");

const passportSignIn = passport.authenticate("local", { session: false });
const passportJWT = passport.authenticate("jwt", { session: false });

router.route("/signup").post(validateBody(schemas.regSchema), User.signUp);

router
  .route("/signin")
  .post(validateBody(schemas.authSchema), passportSignIn, User.signIn);

router.route("/secret").get(passportJWT, User.secret);

module.exports = router;
