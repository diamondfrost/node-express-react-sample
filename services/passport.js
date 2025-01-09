const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

// pull schema out of mongoose
const User = mongoose.model('users');

// convert google id to user id from db
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// convert user id from db to google id
passport.deserializeUser((id, done) => {
    User.findById(id)
    .then(user => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy({
        clientID: keys.googleCleintID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true,
    },
    (accessToken, refreshToken, profile, done) => {
        // returns a promise
        User.findOne({ googleId: profile.id })
            .then(existingUser => {
                if (existingUser) {
                    // already have a record with the given profile ID
                    // arg1: error, arg2: user
                    done(null, existingUser);
                } else {
                    // we don't have a user record with this ID, make a new record!
                    new User({ googleId: profile.id })
                        .save()
                        // wait til save done then run done
                        .then(user => done(null, user));
                }
            })
    })
);