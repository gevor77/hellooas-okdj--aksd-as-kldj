import mongoose, {Document} from 'mongoose';
interface IPost extends Document {
	name: string,
	description: string,
	userId:string,
	postLikes: [{user_id:string}],
	comments: [{newComment:string}],
	date: Date
}
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

export default mongoose.model<IPost>('Post', postSchema);
