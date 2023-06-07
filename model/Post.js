const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    postLikes:  [{
            user_id: mongoose.Schema.Types.ObjectId,
            status: {
                type: String,
                default: 'unlike'
            },
        }]
    
})

module.exports = mongoose.model('Post', postSchema);