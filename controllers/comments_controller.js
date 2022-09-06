const Comment = require('../models/comments');
const Post = require('../models/posts');

module.exports.create = function(req, res){
    Post.findById(req.body.post, function(err, post){

        if (post){
            Comment.create({
                content: req.body.content,
                userId: req.user._id,
                postId: post,
                parentPostUserId: post.userId
            }, function(err, comment){
                // handle error

                post.comments.push(comment);
                post.save();

                res.redirect('/');
            });
        }

    });
}

//delete comments
module.exports.destroy = function(req, res)
{
  Comment.findById(req.params.id, function(err, comment)
  {
    //here we are going inside comment models and finding the comment
    //which the user clicked to delete
    if(comment.user == req.user.id){
        //if the user who posted that comment is same as the user trying to delete the comment
        let postId = comment.post;
        comment.remove();
        Post.findByIdAndUpdate(postId, {$pull:{comments: req.params.id}}, function(err, post){
            return res.redirect('back');
        })
    }else{
        //if the user trying to delete the comment is different from user who posted that comment
        //send the control back to the user
        return res.redirect('back');
    } 
  })
}

//delete comments by post-created-user
module.exports.destroyByPost = function(req, res)
{
  Comment.findById(req.params.id, function(err, comment)
  {
    //here we are going inside comment models and finding the comment
    //which the user clicked to delete
    if(comment.postCretedByUserId == req.user.id){
        //if the user who posted that comment is same as the user trying to delete the comment
        let postId = comment.post;
        comment.remove();
        Post.findByIdAndUpdate(postId, {$pull:{comments: req.params.id}}, function(err, post){
            return res.redirect('back');
        })
    }else{
        //if the user trying to delete the comment is different from user who posted that comment
        //send the control back to the user
        return res.redirect('back');
    } 
  })
}