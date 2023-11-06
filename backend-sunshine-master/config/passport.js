const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const User = require("../models/User");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/redirect",
      scope: ["profile", "email"],
    },
    async function (accessToken, refreshToken, profile, callback) {
      let email = profile?.emails?.at(0)?.value;
      let isUser = await User.findOne({ email });
      if (!isUser) {
        if (!isUser.googleId) {
          throw Error("Please use email and passport to login");
        }
        console.log(`Initializing User..`);
        let userObj = {
          firstName: profile?.name?.givenName,
          lastName: profile?.name?.familyName,
          email,
          googleId: profile?.id,
        };
        await User.create({
          ...userObj,
        });
      }
      callback(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
