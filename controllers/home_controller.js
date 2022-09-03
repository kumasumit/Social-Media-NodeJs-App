module.exports.home = function(req, res)
{
    return res.render('home', {
        title:"Home"
    });
}

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