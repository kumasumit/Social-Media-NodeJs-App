//require mongoose
const mongoose = require('mongoose');
//design a mongoose Comment Schema
const commentSchema = new mongoose.Schema({
    content:{
        type: String,
        required: true
    },
    //here content is the content of the comment user creates
    //link the comment to the user who created the comment
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    //link the comment to the post on which the comment was pasted
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }
}, {
    timestamps: true
    // we have used timestamps to store createdAt and updatedAt
})
const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;