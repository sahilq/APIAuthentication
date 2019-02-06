//require libraries
const express = require("express");
const router = require("express-promise-router")();
const passport = require("passport");

//require passport configuration
require("../passport");

//require validation middleware files
const { validateBody, schemas } = require("../helper/routeHelpers");
// require controller file for users
const User = require("../controllers/users");

//passport methods to const
const passportSignIn = passport.authenticate("local", { session: false });
const passportJWT = passport.authenticate("jwt", { session: false });

//signup actions->validate->check if already exists->create new user
router.route("/signup").post(validateBody(schemas.regSchema), User.signUp);

//signin action->validate body->find user->validate password->login
router
  .route("/signin")
  .post(validateBody(schemas.authSchema), passportSignIn, User.signIn);

//secret route
router.route("/secret").get(passportJWT, User.secret);

//export module
module.exports = router;
