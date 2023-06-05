const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description: String,
    userId: String
})

module.exports = mongoose.model('Post', postSchema);