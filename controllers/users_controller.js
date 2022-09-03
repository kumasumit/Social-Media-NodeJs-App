// const { findOneAndUpdate } = require('../models/users');
const User = require('../models/users');
//controller for profile page
module.exports.profile = function(req, res){
    // console.log(5);
    // console.log(req.cookies);
if(req.cookies.user_id){
    //find the user by Id
    User.findById(req.cookies.user_id, function(err, user)
    {
        if(user){
            //if the user is found snd the user to the profile page
            return res.render('user_profile', {
                title: "User Profile",
                user: user
            })
        }else{
            return res.redirect('/users/sign-in');
        }
    })
}else{
    //if there are no cookies stored send the control back to the sign in page
    return res.redirect('/users/sign-in');
}
}
//Controller for Sign Up Form Submission
// create User
module.exports.create = function(req, res){
    // console.log(req.body);
    // first check whether password and confirm password are equal or notEqual, if they are not equal send the user back to the sign up page
    if(req.body.password !== req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email:req.body.email}, function(err, user){
        if(err){
            console.log('error in signing up');
            return;
        }
        if(!user){
            //means no previous user is associated with that email, create and store the new user
            User.create(req.body, function(err, user){
                if(err){
                    console.log('error in creating user while signing up');
                    return;
                }
                //after creating the user redirect the user to sign in page for the new user to sign in
                return res.redirect('sign-in');
            })
        }
        // if the user is already present send the control back to sign up page
        else{
            return res.redirect('back');
        }
    })

}
//Controller for Sign In Form Submission
module.exports.createSession = function(req, res){
    //find the user by the email
    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            console.log('error in finding user in signing in');
            return;
        }
        //handle user found
        if(user){
            //handle password which dont match with saved user password
            if(user.password !== req.body.password){
                //return the control back to the sign in page
                return res.redirect('back');
            }
            // handle session-creation if user is found and the password entered is same as password of the user in the database
            req.cookies.user_id = user._id;
            // now redirect the user to the profile page
            return res.redirect('profile');
        }
        // handle user not found redirect it to the sign-in page
        else{
            return res.redirect('back');
        }
    })
}
//Controller to render the signin page
module.exports.signUp = function(req, res)
{
    return res.render('user_sign_up', {
        title: "FriendBook | Sign Up"
    })
}



//controller to render the signup page
module.exports.signIn = function(req, res){
    return res.render('user_sign_in', {
        title: "FriendBook | Sign In" 
    })
}

//controller for logout
module.exports.logout = function(req, res)
{   
    //set the user_id stored in cookies.user_id to null
    req.cookies.user_id = null;
    return res.render('user_sign_in',{
        title: "FriendBook | Sign In"
    });
}