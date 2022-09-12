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
        post.remove();
        await Comment.deleteMany({ postId: req.params.id });
        return res.status(200).json({
            message: "Post and associated comments deleted"
        });
    }
    catch (err) {

        return res.status(500).json({
            message: "Internal Sever Error"
        });

    }
}

