const User = require('../../../models/users');
const jwt = require('jsonwebtoken');

//Controller for Sign In Form Submission
module.exports.createSession = async function (req, res) {
    try{
        let user = await User.findOne({email: req.body.email});
        if(!user || user.password != req.body.password){
            // if no user is found by the email entered or the password entered for the corresponding email is not the same as the password stored in the database,
            // then
            return res.status(422).json({
                message: "Invalid Username and Password"
            })
        }
        //if the user is found
        return res.status(200).json({
            message:"Sign in successful, here is your token, please keep it safe",
            data:{
                token: jwt.sign(user.toJSON(), 'friendbook', {expiresIn: '600000'})
                // this is 600 seconds in milliseconds or 10 minutes which is time for which otps are valid}
            }
        })
    }catch(err){
       console.log('*******', err);
       return res.status(500).json({
        message: "Internal Server Error"
       }) 
    }
   
}