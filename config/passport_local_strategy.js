//require the passport instance
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/users");
// Authentication using Passport
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    function (email, password, done) {
      console.log(" >>>>>>>>>>> client data");
      console.log(email, password);
      console.log(" <<<<<<<<<<<< server data");

      User.findOne({ email: email }, function (err, user) {
        if (err) {
          console.log("Error in finding user ===> Passport");
          return done(err);
        }
        console.log(" >>>>>>>>>>> start of the ");
        console.log(user);
        console.log(user.password);

        console.log(" >>>>>>>>>>> end of the start");

        if (!user || user.password !== password) {
          console.log("Invalid Username/Password");
          return done(null, false);
        }
        return done(null, user);
        // here user is the user found and authenticated
      });
    }
  )
);

//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

//deserializing te user from the key in the cookies
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    if (err) {
      console.log("Error in finding user ---> Passport");
      return done(err);
    }
    return done(null, user);
  });
});
//check if the user is authenticated
passport.checkAuthentication = function (req, res, next) {
  //if user is signed in, then pass on the request to the next function
  if (req.isAuthenticated()) {
    return next();
  }
  //if user is not signed in
  return res.redirect("/users/sign-in");
};

passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    //req.user containes the current signed in user from the seesion cookie and we are just sending this to the locals for the views
    res.locals.user = req.user;
  }
  next();
};
//at last export the passport module
module.exports = passport;
