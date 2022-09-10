const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars')
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

//multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..', AVATAR_PATH ));
    },
    // here destination is the exact link where our files will be stored
    filename: function (req, file, cb) {
      
      cb(null, file.fieldname + '-' + Date.now());
    //   we added the date with each file so that each file with even the same names SubmitEvent.png are unique because of teh date
    }
  })
  
//   const upload = multer({ storage: storage })
//multer storage closes

//making static functions
userSchema.statics.uploadAvatar = multer({storage: storage}).single('avatar');
// .single('avatar') tells multer only one file must be added for fieldname avatar
userSchema.statics.avatarPath = AVATAR_PATH;
//how to access static values
// User.uploadAvatar , User.avatarPath 
const User = mongoose.model('User', userSchema);
module.exports = User;