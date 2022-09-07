const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    //here content refers to content of the post
    content: {
        type: String,
        required: true
    },
    //here we store the id of user who created the post
    userId: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'User'
        // here we are referecing the user schema
    },
    //include the array of ids of all comments in the post Schema itself
    comments: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Comment'
    },
    ]

},{
    timestamps: true
    // we have used timestamps to store createdAt and updatedAt
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;