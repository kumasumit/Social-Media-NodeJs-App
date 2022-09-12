const Post = require('../../../models/posts');
const Comment = require('../../../models/comments');
module.exports.index = async function (req, res) {  // Step 1: get posts
    //any success response of Post.find will be stored in posts 
    let posts = await Post.find({})
        .sort('-createdAt')
        .populate('userId')
        .populate({
            path: 'comments',
            populate: {
                path: 'userId'
            }
        })
    return res.status(200).json({
        message: "Lists of latest posts",
        posts: posts
    })
}

//delete a post and all associated comments
module.exports.destroy = async function (req, res) {
    try {

        let post = await Post.findById(req.params.id);
        if (post.userId == req.user.id) {
            //if the userId of the user who created the post is same as the id of user who is logged in only then delete the post

            post.remove();
            await Comment.deleteMany({ postId: req.params.id });
            return res.status(200).json({
                message: "Post and associated comments deleted"
            });
        }else{
         //if the logged in user is not the user who has created the post then
         return res.status(401).json({
            message: "You are not authorized, you cannot delete the post"
         })
        }
    }    
    catch (err) {
            return res.status(500).json({
                message: "Internal Sever Error"
            });

        }
    }

