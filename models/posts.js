const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
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