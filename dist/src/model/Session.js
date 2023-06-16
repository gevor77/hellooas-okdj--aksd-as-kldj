import mongoose from 'mongoose';
const sessionSchema = new mongoose.Schema({
    userID: String,
    uuId: String,
});
export default mongoose.model('Session', sessionSchema);
