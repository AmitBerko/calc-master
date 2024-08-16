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
  levels: {
    type: [String], // Array of strings representing the ids of each level
  }
})

const User = mongoose.models.User || mongoose.model('User', UserSchema)

export default User
