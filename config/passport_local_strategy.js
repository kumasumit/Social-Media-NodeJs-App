//require the passport instance
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users');
// Authentication using Passport
passport.use(new LocalStrategy(
    {
    usernameField:'email',
    },
    function(email, password, done) {
      User.findOne({ email: email }, function (err, user) {
        if (err) 
        { 
            console.log('Error in finding user ===> Passport')
            return done(err);
        }
        if (!user || user.password !== password) 
        {   
            console.log('Invalid Username/Password');
            return done(null, false); 
        }
        return done(null, user);
        // here user is the user found and authenticated
      });
    }
));

//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    done(null, user._id)
})

//deserializing te user from the key in the cookies
passport.deserializeUser(function(id, done)
{
  User.findById(id, function(err, user){
    if(err){
        console.log('Error in finding user ---> Passport');
        return done(err);
    }
    return done(null, user);
  })    
})
//at last export the passport module
module.exports = passport;