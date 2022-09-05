const Post = require('../models/posts');
const Comment = require('../models/comments');
module.exports.create = function (req, res) {
    Post.create({
        content: req.body.content,
        user: req.user._id
    }, function (err, post) {
        if (err) {
            console.log('error in creating a post');
            return;
        }
        return res.redirect('back');
    })
}

//delete a post and all associated comments
module.exports.destroy = function(req, res){
    Post.findById(req.params.id, function(err, post){
        // .id means converting the object id into string
        if (post.user == req.user.id){
            post.remove();
            //go inside comments and search all the comments belonging to a particular post and delete them
            Comment.deleteMany({post: req.params.id}, function(err){
                return res.redirect('back');
            });
        }
        //if no post is found for that id, send the control back
        else{
            return res.redirect('back');
        }

    });
}