import mongoose, {Document} from 'mongoose';
interface ISession extends Document {
	userID: string,
	uuId: string
}
const sessionSchema = new mongoose.Schema({
	userID: String,
	uuId: String,
});

export default mongoose.model<ISession>('Session', sessionSchema);
