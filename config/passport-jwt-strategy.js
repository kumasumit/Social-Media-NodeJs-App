const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../models/users');
//this tells us how our jwt token is set
let opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    // inside request header , inside bearer we have the token
    secretOrKey: 'friendbook',
    // this secret key is my encrption and decryption key
}

passport.use(new JwtStrategy(opts, function(jwtPayload, done) {
    User.findById(jwtPayload._id, function(err, user) {
        if (err) {
            console.log("Error in finding the user from JWT");
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            //here false means user was not found in existing database
            // or you could create a new account
        }
    });
}));

module.exports = passport;