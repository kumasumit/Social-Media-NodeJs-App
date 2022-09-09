const Post = require('../models/posts');
const Comment = require('../models/comments');

//controller to create a post
module.exports.create = async function (req, res) {
    try {
        //create a post with content and userId
        let post = await Post.create({
            content: req.body.content,
            userId: req.user._id
        //here userId stores only the id of the user not the complete user reference
        })
        //check whether the incoming req is ajax/JQuery request
        if(req.xhr){
            post.userId = req.user;
            //this will store the user reference with name email and password  
            //now we return the post as json data
            return res.status(200).json({
                data: {
                    post: post,
                    // here post is the post we just created above
                },
                message:"Post Created!"
            })
        }
        //after creating the post return the control back
        return res.redirect('back');
    } catch (err) {
        console.log("Error: ", err);
        return;
    }
}

//delete a post and all associated comments
module.exports.destroy = async function (req, res) {
    try {
        //find a post by id and store it in a post variable
        let post = await Post.findById(req.params.id);
        // .id means converting the object id into string
        if (post.userId == req.user.id) {
            //if the userId of the user who created the post is same as the id of user who is logged in only then delete the post
            post.remove();
            //delete the post
            //go inside comments and search all the comments belonging to a particular post and delete them
            await Comment.deleteMany({ postId: req.params.id });
            // after the post and all its associated comments have been deleted from the database
            //we check if the req object is ajax/jquery req object
            if(req.xhr){
            //  console.log(req.params.id);
              return res.status(200).json({
                data: {
                    post_id: req.params.id
                },
                message: 'Post deleted !'
              })
            }
            return res.redirect('back');
        }
        //if no post is found for that id, send the control back
        else {
            return res.redirect('back');
        }

    } catch (err) {
        console.log("Error: ", err);
        return;

    }
}

