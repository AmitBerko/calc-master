import mongoose from 'mongoose'

const ButtonSchema = new mongoose.Schema({
	text: { type: String, required: true },
	type: {
		color: { type: String, required: true },
		purpose: { type: String, required: true },
	},
	buttonData: { type: mongoose.Schema.Types.Mixed, required: true },
})

const SettingsSchema = new mongoose.Schema({
	result: { type: Number, required: true },
	goal: { type: Number, required: true },
	moves: { type: Number, required: true },
})

const LevelsSchema = new mongoose.Schema({
	buttons: { type: [ButtonSchema], required: true },
	originalSettings: { type: SettingsSchema, required: true },
	currentSettings: { type: SettingsSchema, required: true },
})

const Levels = mongoose.model('Levels', LevelsSchema)

export default Levels
