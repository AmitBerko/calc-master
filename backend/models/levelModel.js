import mongoose from 'mongoose'

const ButtonSchema = new mongoose.Schema({
	text: { type: String },
  color: { type: String },
  type: { type: String },
	buttonData: { type: mongoose.Schema.Types.Mixed },
})

const SettingsSchema = new mongoose.Schema({
	result: { type: Number, required: true },
	goal: { type: Number, required: true },
	moves: { type: Number, required: true },
})

const LevelSchema = new mongoose.Schema({
	buttons: {
		type: [ButtonSchema],
		required: true,
		validate: [(value) => value.length === 8, 'Buttons array must have length equal to 8.'],
	},
	originalSettings: { type: SettingsSchema, required: true },
	currentSettings: { type: SettingsSchema, required: true },
})

const Level = mongoose.model('Level', LevelSchema)

export default Level
