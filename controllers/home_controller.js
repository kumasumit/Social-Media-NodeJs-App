const Post = require('../models/posts');
const User = require('../models/users');
//populate the user of each post
module.exports.home = function(req, res)
{   
    Post.find({}) 
    //find({}) this will find all the posts
    .populate('user')
    //this will popluate the user which created that post
    .populate({
        path:'comments',
        // this will populate all the comments for that post
        populate: {
            path: 'user'
        // this will populate the user which created that comment    
        }
    })
    .exec(function(err, posts)
    {   
        if (err) return handleError(err);
        User.find({}, function(err, users){
        //User.find({}) will display all the users in the database    
            return res.render('home', {
                title:" FreindBook || Home",
                posts: posts,
                all_users: users
            });    
        })
        
        
    })     
}

