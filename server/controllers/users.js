const JWT = require("jsonwebtoken");

const User = require("../models/users");
const { JWT_SECRET } = require("../config/index");

//creating token
signtoken = newUser => {
  return JWT.sign(
    {
      sub: newUser._id,
      iat: new Date().getTime(),
      exp: Math.floor(new Date() / 1000) + 60 * 60
    },
    JWT_SECRET
  );
};
//export function
module.exports = {
  signUp: async (req, res, next) => {
    const { email, password, name } = req.value.body;

    //check if email available
    const foundUser = await User.findOne({ email: email });
    if (foundUser) {
      return res.status(401).json({ error: "AUTH ERROR" });
    }
    //add user and save
    const newUser = new User({ email, password, name });
    await newUser.save();

    //generate web token
    const token = signtoken(newUser);
    const user = { email: newUser.email, id: newUser._id, name: newUser.name };
    //respond with token
    res.status(200).json({ token, user });
  },
  signIn: async (req, res, next) => {
    //generate web token
    const token = signtoken(req.user);
    //fetch user id
    const user = {
      email: req.user.email,
      id: req.user._id,
      name: req.user.name
    };
    //respond with token and user details
    res.status(200).json({ token, user });
  }, //random protected resource for testing
  secret: async (req, res, next) => {
    console.log(`User.secret() called`);
    res.json({ message: "IN USERS SECRET" });
  }
};
