import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		match: [/.+@.+\..+/, 'Please enter a valid email address'],
	},
	username: {
		type: String,
		required: true,
		unique: true,
		minlength: 4,
		maxlength: 10,
	},
	hashedPassword: { type: String, required: true },
})

const User = mongoose.model('User', UserSchema)

export default User
