const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const { ExtractJwt } = require("passport-jwt");
const { JWT_SECRET } = require("./config/index");
const User = require("./models/users");

//JWT STARATEGY
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader("authorization"),
      secretOrKey: JWT_SECRET
    },
    async (payload, done) => {
      try {
        // finding the user
        const user = await User.findById(payload.sub);
        // check if exists
        if (!user) {
          //handle not found
          return done(null, false);
        }
        //return user
        done(null, user);
      } catch (e) {
        done(e, false);
      }
    }
  )
);

//LOCAL STRATEGY
passport.use(
  new LocalStrategy(
    {
      usernameField: "email"
    },
    async (email, password, done) => {
      try {
        // Find the user given the email
        const user = await User.findOne({ email });

        // If not, handle it
        if (!user) {
          return done(null, false);
        }
        console.log("User password is", user.password);
        // Check if the password is correct
        const isMatch = await user.isValidPassword(password);
        // If not, handle it
        if (!isMatch) {
          return done(null, false);
        }

        // Otherwise, return the user
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);
