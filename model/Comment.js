const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    auther: String,
    post_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },    
})

module.exports = mongoose.model('Comment', commentSchema);