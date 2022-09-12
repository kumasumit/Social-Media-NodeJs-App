const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = ('../models/users');
//tell passport to use a new strategy for google login
passport.use(new googleStrategy({
    clientID: "537708258489-j0s00rg3oisfspqe5g9ekufvj5nu686b.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8080/users/auth/google/callback"
},
    //this is the callback function
    function (accessToken, refreshToken, profile, done) {
        // accessToken is used by google to verify the user just like jwt token
        //refresh token is used by google to generate a new token when the old token expires
        //here done is the callback after this callback function executes
        //find a user
        User.findOne({ email: profile.emails[0].value }).exec(function (err, user) {
                if (err) {
                    console.log("Error in Google strategy-passport", err);
                    return;
                }
                console.log(profile);
                //if the user is found, set the user as req.user
                if (user) {
                    return done(null, user);
                } else {
                    //if user is not found in our databasewe create that user in our database
                    User.create({
                        //create the new user and set it as req.user
                        //what we mean by set the user as req.user is simply sign in the user
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        password: crypto.randomBytes(20).toString('hex'),
                    }, function (err, user) {
                        //this is the callback function after User.create
                        if (err) {
                            console.log("Error in creating User Google strategy-passport", err);
                            return;
                        }
                        return done(null, user);
                        // done is just the name of callback function
                    })
                }
            })
    }
));

module.exports = passport;
