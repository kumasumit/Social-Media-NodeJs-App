const User = require('../models/users');
const fs = require('fs');
const path = require('path');
//view the profile page of individual user
module.exports.profile = async function (req, res) {
    // console.log(req.params.id);
    let user = await User.findById(req.params.id);
    // console.log(user);
    //here params.id is the id of the user on which you clicked
    res.render('user_profile', {
        title: "User Profile",
        profile_user: user
    })
}

//controller to update profile if user is logged in and viewing his own profile
module.exports.update = async function (req, res) {
    if (req.user.id == req.params.id) {
        try {
            let user = await User.findById(req.params.id);
            User.uploadAvatar(req, res, function (err) {
                if (err) {
                    console.log('***** Multer Error', err)
                }
                user.name = req.body.name;
                user.email = req.body.email;
                if (req.file) {
                    if (user.avatar) {
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    }
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                console.log(user);
                return res.redirect('back');

            })
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
}
//Controller for Sign Up Form Submission
// create User
module.exports.create = function (req, res) {
    // console.log(req.body);
    // first check whether password and confirm password are equal or notEqual, if they are not equal send the user back to the sign up page
    if (req.body.password !== req.body.confirm_password) {
        return res.redirect('back');
    }
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            console.log('error in signing up');
            return;
        }
        if (!user) {
            //means no previous user is associated with that email, create and store the new user
            User.create(req.body, function (err, user) {
                if (err) {
                    console.log('error in creating user while signing up');
                    return;
                }
                //after creating the user redirect the user to sign in page for the new user to sign in
                return res.redirect('sign-in');
            })
        }
        // if the user is already present send the control back to sign up page
        else {
            return res.redirect('back');
        }
    })

}
//Controller for Sign In Form Submission
module.exports.createSession = function (req, res) {
    return res.redirect('/');
}
//Controller to render the signup page
module.exports.signUp = function (req, res) {
    if (req.isAuthenticated()) {
        //  if user is already signed in , send the user to the profile page
        return res.redirect('profile')
    }
    return res.render('user_sign_up', {
        title: "FriendBook | Sign Up"
    })
}



//controller to render the signin page
module.exports.signIn = function (req, res) {
    if (req.isAuthenticated()) {
        //if user is logged in, redirect it to the profile page
        return res.redirect('profile')
    }
    return res.render('user_sign_in', {
        title: "FriendBook | Sign In"
    })
}

//controller for logout for signout
module.exports.destroySession = function (req, res, next) {

    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });

}