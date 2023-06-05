const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    userID: String,
    uuId: String
})

module.exports = mongoose.model('Session', sessionSchema);