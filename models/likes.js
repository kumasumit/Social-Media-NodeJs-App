const mongoose = require('mongoose');
const likesSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,  
        //this is userId of the user who likd the post or comment  
    }, 
    likeable:{
        //this is id of the object on which the like was done, 
        //it may be a postId or a commentId
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'onModel'

    },
    //this field is used for defining the type of the liked object since this is a dynamic reference
    onModel: {
       type: String,
       required: true,
       //enum tells us that the object id for refPath can be either Post or Comment nothing else
       enum: ['Post', 'Comment']
    }
},{
    timestamps: true
}
);

//make a Like model and connect it to likesSchema
const Like = mongoose.model('Like', likesSchema);
module.exports = Like;
