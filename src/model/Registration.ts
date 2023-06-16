import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
});

export default mongoose.model('Registration', registrationSchema);
