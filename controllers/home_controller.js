const Post = require('../models/posts');
//populate the user of each post
module.exports.home = function(req, res)
{   
    Post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate: {
            path: 'user'
        }
    })
    .exec(function(err, posts)
    {
        if (err) return handleError(err);
        return res.render('home', {
            title:"Home",
            posts: posts
        });    
    })     
}

