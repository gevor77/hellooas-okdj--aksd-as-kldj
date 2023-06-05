const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    auther: String,
    post_id: String
})

module.exports = mongoose.model('Comment', commentSchema);