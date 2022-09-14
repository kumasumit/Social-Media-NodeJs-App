//require mongoose
const mongoose = require('mongoose');
//design a mongoose Comment Schema
const commentSchema = new mongoose.Schema({
    //here content is the content of the comment user creates
    content:{
        type: String,
        required: true
    },    
    //link the comment to the user who created the comment
    //here userId is the id of the user who created that comment
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    //link the comment to the post on which the comment was pasted
    //postId stores the id of the post on which the comment was created
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    //stores the userId of the of the user who created that post on which comment was created
    parentPostUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }, 
    likes:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Like'  
        },
    ],
}, {
    timestamps: true
    // we have used timestamps to store createdAt and updatedAt
})
const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;