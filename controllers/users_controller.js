const User = require("../models/users");
const Token = require("../models/token");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const { addJobToQueue } = require("../email_service/kue");

//view the profile page of individual user
module.exports.profile = async function (req, res) {
  // console.log(req.params.id);
  let user = await User.findById(req.params.id);
  // console.log(user);
  //here params.id is the id of the user on which you clicked
  res.render("user_profile", {
    title: "User Profile",
    profile_user: user,
  });
};

//controller to update profile if user is logged in and viewing his own profile
module.exports.update = async function (req, res) {
  if (req.user.id == req.params.id) {
    try {
      let user = await User.findById(req.params.id);
      User.uploadAvatar(req, res, function (err) {
        if (err) {
          console.log("***** Multer Error", err);
        }
        user.name = req.body.name;
        user.email = req.body.email;
        if (req.file) {
          if (user.avatar) {
            fs.unlinkSync(path.join(__dirname, "..", user.avatar));
          }
          user.avatar = User.avatarPath + "/" + req.file.filename;
        }
        user.save();
        // console.log(user);
        return res.redirect("back");
      });
    } catch (err) {
      console.log("Error: ", err);
      return;
    }

    //     User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
    //         return res.redirect('back');

    //     })
    // }else{
    //     return res.status(401).send('Unauthorized');
    // }
  }
};
//Controller for Sign Up Form Submission
// create User
module.exports.create = function (req, res) {
  // console.log(req.body);
  // first check whether password and confirm password are equal or notEqual, if they are not equal send the user back to the sign up page
  if (req.body.password !== req.body.confirm_password) {
    return res.redirect("back");
  }
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("error in signing up");
      return;
    }
    if (!user) {
      //means no previous user is associated with that email, create and store the new user
      User.create(req.body, function (err, user) {
        if (err) {
          console.log("error in creating user while signing up");
          return;
        }
        //after creating the user redirect the user to sign in page for the new user to sign in
        return res.redirect("sign-in");
      });
    }
    // if the user is already present send the control back to sign up page
    else {
      return res.redirect("back");
    }
  });
};
//Controller for Sign In Form Submission
module.exports.createSession = function (req, res) {
  return res.redirect("/");
};
//Controller to render the signup page
module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    //  if user is already signed in , send the user to the profile page
    return res.redirect("profile");
  }
  return res.render("user_sign_up", {
    title: "FriendBook | Sign Up",
  });
};

//controller to render the signin page
module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    //if user is logged in, redirect it to the profile page
    return res.redirect("profile");
  }
  return res.render("user_sign_in", {
    title: "FriendBook | Sign In",
  });
};

//controller for logout for signout
module.exports.destroySession = function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

//action to handle forgotpassword Link
module.exports.forgotPassword = function (req, res, next) {
  res.render("forget_password", {
    title: "Forget Password",
  });
};

//action to handle when to update password when you click of forget password link
module.exports.updateForgotPassword = async function (req, res, next) {
  try {
    const email = req.body.email;
    console.log(email);
    const userDetail = await User.findOne({ email: req.body.email });

    console.log(userDetail);
    // validate the email
    if (userDetail) {
      const generatedToken = crypto.randomBytes(20).toString("hex");
      console.log(generatedToken);

      // generate the token
      const bcryptSalt = 10;
      const hashedToken = generatedToken;
      // await bcrypt.hash(generatedToken, Number(bcryptSalt));

      //we populate the name and email of the user using userId stored in comments
      let token = await Token.findOne({
        userId: userDetail._id,
      });

      console.log(" token = " + JSON.stringify(token));

      if (token == null) {
        token = await Token.create({
          userId: userDetail._id,
          token: hashedToken,
        });
        console.log(" >>>>>>>>>>>>>>>>>>>> start of the generated token");
        console.log(token);
        console.log(" >>>>>>>>>>>>>>>>>>>> start of the generated token");
      } else {
        // store the token
        token.token = hashedToken;
        await Token.updateOne(
          { userId: userDetail._id },
          {
            $set: {
              token: hashedToken,
            },
          }
        );
      }
      token = await token.populate("userId", "name email");

      console.log(token);
      // send the email to the user
      addJobToQueue("resetEmails", token);

      // redirect to successfull_forgot_password.ejs
      return res.render("verification_sent", {
        title: "FriendBook",
      });
    } else {
      return res.render("forgot_error", {
        title: "FriendBook",
      });
    }
  } catch (error) {
    console.log(error);
    return;
  }
};

module.exports.passwordReset = async (req, res) => {
  try {
    const token = req.query.token;
    const userId = req.query.id;

    console.log(userId);
    const userDetail = await User.findById(userId);
    if (userDetail) {
      const tokenDetail = await Token.findOne({ userId: userId });
      const hashedToken = tokenDetail.token;

      console.log(tokenDetail);
      console.log(hashedToken);
      console.log(token);

      const isValid = token === hashedToken;
      // await bcrypt.compare(token, hashedToken);

      console.log(isValid);

      if (!isValid) {
        throw new Error("Invalid or expired password reset token");
        return;
      }
    }

    console.log(userDetail);

    return res.render("successfull_forgot_password.ejs", {
      title: "FriendBook",
      tokenResetingObj: {
        userId: userId,
        token: token,
      },
    });
  } catch (error) {
    console.log(error);
    return;
  }
};

module.exports.resetNewPassword = async (req, res) => {
  try {
    console.log(">>>>>>>>>>>>>>>>");
    console.log(req.body);
    console.log("<<<<<<<<<<<<<<<<<<");

    const userId = req.body.userId;
    const password = req.body.password;
    // console.log(password);
    // console.log(userId);

    if (req.body.confirmNewPassword != password) {
      return res.redirect("back");
    }

    const userDetail = await User.findById(userId);

    if (userDetail) {
      const tokenDetail = await User.updateOne(
        { _id: userId },
        { $set: { ...userDetail._doc, password: password } }
      );
      console.log(tokenDetail);
      await Token.deleteMany({ userId: userId });
    } else {
      throw new Error("Invalid or expired password reset token");
      return;
    }

    // await Token.deleteMany({ userId: userId });
    // console.log(userDetail);

    return res.render("user_sign_in", {
      title: "FriendBook | Sign In",
    });
  } catch (error) {
    console.log(error);
    return;
  }
};
