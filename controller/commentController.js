const Comment = require('../model/Comment');
const jwt = require('jsonwebtoken');
const Post = require('../model/Post');

function tokenFunction(req) {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    return decode;
}

class CommentController {

    async addComment(req, res) {
        try {
            const decode = tokenFunction(req);
            const postId = req.params.postId;
            const post = await Post.findOne({_id: postId});
            const comment = req.body.comment;
            const comm = new Comment ({comment, auther:decode.id, post_id:postId});            
            await comm.save();
            return res.json({message: "Comment added "})
        } catch (e) {
            res.status(400).json({message: `Comment  dosn't add ${e}`})
        }
    }
    async replyComment(req, res) {
        try {
            const comment = await Comment.find();
            res.json(comment);
        } catch (error) {
            console.log(err);
        }
    }

}
module.exports = new CommentController;