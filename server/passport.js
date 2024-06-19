const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
require("dotenv").config();
const models = require("./models/index.js");
const User = models.User;

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:3000/api/auth/google/callback",
            passReqToCallback: true,
        },
        async function (request, accessToken, refreshToken, profile, done) {
            if (profile?.id) {
                await User.findOrCreate({
                    where: {
                        id: profile.id,
                    },
                    defaults: {
                        full_name: profile.displayName,
                        email: profile.emails[0]?.value,
                    },
                });
            }
        }
    )
);

// profile.id profile.displayName
