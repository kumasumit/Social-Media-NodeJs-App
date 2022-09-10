const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/upload/users/avatars')
//'/upload/users/avatars' is the path where we store our avaatars locally
const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    }, name: {
        type: String,
        required: true
    },
    avatar: {
        type:String
    }
    // avatar will store the link to where the avatar image is stored in form of a link
},{
    timestamps: true
//   timestamps store the value createdAt and updatedAt
})

const User = mongoose.model('User', userSchema);
module.exports = User;