const { notDeepEqual } = require("assert")

module.exports.profile = function(req, res){
    res.send('<h1>User Profile</h1>')
}
//Controller for Sign Up Form Submission
// create User
module.exports.create = function(req, res){
    // first check whether password and confirm password are equal or notEqual, if they are not equal send the user back to the sign up page
    console.log(req.body);
}
//Controller for Sign In Form Submission
module.exports.createSession = function(req, res){}
//Controller to render the signin page
module.exports.signUp = function(req, res){
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