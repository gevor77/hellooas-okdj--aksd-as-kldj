import Comment from '../model/Comment.js';
import Post from '../model/Post.js';
import ObjectId from 'mongoose';
import type {RequestAddComment, ResponseAddComment, RequestReplyComment, ResponseReplyComment} from '../type/CommentType';

class CommentController {
	// eslint-disable-next-line class-methods-use-this, consistent-return
	async addComment(req: RequestAddComment, res:ResponseAddComment) {
		try {
			const {userId} = req;
			const postId = req.params.postId;
			const post = await Post.findOne({_id: postId});

			const comment: string = req.body.comment;
			const newComment = new Comment({comment,
				auther: userId,
				post_id: postId});
			await newComment.save();
			// eslint-disable-next-line no-underscore-dangle
			await post.comments.push(newComment._id);
			await post.save();

			return res.json({message: 'Comment added '});
		} catch (e) {
			return res.status(400).json({message: `Comment  dosn't add ${e}`});
		}
	}
	// ///added comment
	// eslint-disable-next-line class-methods-use-this
	async replyComment(req:RequestReplyComment, res:ResponseReplyComment) {
		try {
			const commentId: string = req.params.commentId;
			const comment = await Comment.findOne({post_id: new ObjectId.Types.ObjectId(commentId)});
			const reply: string = req.body.replyComment;
			await comment.replyComment.push({reply,
				post_id: comment.post_id,
				commentId: comment.id});
			await comment.save();

			return res.json({message: 'Comment replayed '});
		} catch (err) {
			return res.status(400).json({message: `Comment  dosn't add ${err}`});
		}
	}
}
export default new CommentController();
