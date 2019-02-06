const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

// User schema
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    uppercase: true,
    unique: false
  },
  password: {
    type: String,
    required: true
  }
});
//Hash password
userSchema.pre("save", async function(next) {
  try {
    //generate salt
    const salt = await bcrypt.genSalt(10);
    //generate hash
    const passwordHash = await bcrypt.hash(this.password, salt);
    //assign hash as password
    this.password = passwordHash;
    next();
  } catch (e) {
    console.log(JSON.stringify(e));
    next(e);
  }
});
//Create method to validate password
userSchema.methods.isValidPassword = async function(newPassword) {
  try {
    return await bcrypt.compare(newPassword, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

//Create model
const User = mongoose.model("user", userSchema);

//export module
module.exports = User;
