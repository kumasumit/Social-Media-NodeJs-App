const User = require('../models/users');

module.exports.profile = function(req, res){
    User.findById(req.params.id, function(err, user){
        //here params.id is the id of the user on which you clicked
        res.render('user_profile', {
            title: "User Profile",
            profile_user: user
        })
    })
    
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
                return res.redirect('users/sign-in');
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
    return res.redirect('/');
}
//Controller to render the signin page
module.exports.signUp = function(req, res)
{   if(req.isAuthenticated())
    {
    //  if user is alreday signed in , send the user to the profile page
    return res.redirect('/users/profile')
    }
    return res.render('user_sign_up', {
        title: "FriendBook | Sign Up"
    })
}



//controller to render the signup page
module.exports.signIn = function(req, res)
{   if(req.isAuthenticated())
    {
    //if user is logged in, redirect it to the profile page
    return res.redirect('/users/profile')
    }
    return res.render('user_sign_in', {
        title: "FriendBook | Sign In" 
    })
}

//controller for logout for signout
module.exports.destroySession = function(req, res, next)
{
    
        req.logout(function(err) {
          if (err) { return next(err); }
          res.redirect('/');
        });
      
}

//controller to update profile
module.exports.update = function(req, res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
            return res.redirect('back');

        })
    }else{
        return res.status(401).send('Unauthorized');
    }
}