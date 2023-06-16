import mongoose from 'mongoose';
const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true,
    },
    auther: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    date: {
        'type': Date,
        'default': Date.now,
    },
    post_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    },
    replyComment: [{
            reply: {
                type: String,
                ref: 'User',
            },
            post_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Post',
            },
            commentId: {
                type: mongoose.Schema.Types.ObjectId,
            },
        },
    ],
});
export default mongoose.model('Comment', commentSchema);
