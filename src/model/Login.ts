import mongoose, {Document} from 'mongoose';
interface ILogin extends Document {
	username: string,
	password: string
}
const loginSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
});

export default mongoose.model<ILogin>('Login', loginSchema);
