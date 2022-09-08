const Comment = require("../models/comments");
const Post = require("../models/posts");

//controller to create a comment
module.exports.create = async function (req, res) {
  // console.log(req.body.post);
  try {
    let post = await Post.findById(req.body.post);
    // console.log(post);
    // console.log(post.userId); id of owner of the post on which comment has been done
    // console.log(req.user._id); id of user who is logged in and has posted that comment on the post
    if (post) {
      let comment = await Comment.create({
        content: req.body.content,
        userId: req.user._id,
        postId: req.body.post,
        parentPostUserId: post.userId._id,
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
    // console.log(comment.userId);
    if (comment.userId == req.user.id) {
      let postId = comment.postId;
      comment.remove();
      await Post.findByIdAndUpdate(postId, {
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
      await Post.findByIdAndUpdate(postId, {
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
