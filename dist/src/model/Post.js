import mongoose from 'mongoose';
const postSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    date: {
        'type': Date,
        'default': Date.now,
    },
    postLikes: [{
            user_id: mongoose.Schema.Types.ObjectId,
        }],
    comments: [{
            newComment: String,
        }],
});
export default mongoose.model('Post', postSchema);
