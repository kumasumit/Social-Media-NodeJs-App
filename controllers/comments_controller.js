const Comment = require("../models/comments");
const Post = require("../models/posts");

//controller to create a comment
module.exports.create = async function (req, res) {
  try {
    let post = await Post.findById(req.body.postId);
    if (post) {
      let comment = await Comment.create({
        content: req.body.content,
        userId: req.user._id,
        postId: req.body.postId,
        parentPostUserId: post.userId,
      });
      post.comments.push(comment);
      post.save();
      res.redirect("/");
    }
  } catch (err) {
    console.log("Error: ", err);
    return;
  }
};

//delete comments if logged-in user and user who posted that comment are same
module.exports.destroy = async function (req, res) {
  try {
    let comment = await Comment.findById(req.params.id);

    if (comment.userId == req.user.id) {
      let postId = comment.postId;

      comment.remove();

      let post = Post.findByIdAndUpdate(postId, {
        $pull: { comments: req.params.id },
      });
      return res.redirect("back");
    } else {
      return res.redirect("back");
    }
  } catch (err) {
    console.log("Error", err);
    return;
  }
};

//delete comments if the logged in user owns the post on which the comment is posted
module.exports.destroyByPostOwner = async function (req, res) {
  try {
    let comment = await Comment.findById(req.params.id);
    if (comment.parentPostUserId == req.user.id) {
      let postId = comment.postId;
      comment.remove();
      let post = Post.findByIdAndUpdate(postId, {
        $pull: { comments: req.params.id },
      });
      return res.redirect("back");
    } else {
      return res.redirect("back");
    }
  } catch (err) {
    console.log("Error", err);
    return;
  }
};
