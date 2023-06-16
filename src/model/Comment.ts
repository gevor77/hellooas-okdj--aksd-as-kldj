import mongoose, {Document} from 'mongoose';
interface IComment extends Document {
	comment: string;
	auther: string;
	date: Date;
	post_id: string;
	replyComment: [{
		reply:string;
		post_id: string;
		commentId: string;
	}];
}
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

export default mongoose.model<IComment>('Comment', commentSchema);
