import express from 'express'
import Level from '../models/levelModel.js'
import User from '../models/userModel.js'
import { authenticateToken } from './authRoute.js'
import deobfuscator from '../deobfuscator.js'

const router = express.Router()

// Create a new level
router.post('/', authenticateToken, async (req, res) => {
	let deobfuscatedData

	try {
		deobfuscatedData = deobfuscator(req.body.obfuscatedData)
	} catch (error) {
		console.error('Deobfuscation error:', error)
		return res.status(400).json({ error: 'Could not deobfuscate the provided data' })
	}

	const { buttons, originalSettings, creatorName } = deobfuscatedData
	try {
		const levelData = { buttons, originalSettings, currentSettings: originalSettings, creatorName }
		const doesLevelExist = await Level.findOne(levelData)
    
		if (doesLevelExist) {
			return res.status(409).json({ message: 'This level already exists.' })
		}

		const newLevel = new Level(levelData)
		await newLevel.save()
		const levelId = newLevel._id
		const userId = req.user._id
		await User.findByIdAndUpdate(userId, { $push: { levels: levelId } })

		res.status(201).json({ message: 'Level saved successfuly' })
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
})

// Get all levels of a user
router.get('/me', authenticateToken, async (req, res) => {
	try {
		const levelIds = req.user.levels

		if (!levelIds) {
			return res.status(404).json({ message: 'Levels were not found' })
		}

		const levels = await Level.find({ _id: { $in: levelIds } }).sort({ createdAt: -1 })
		res.status(200).json(levels)
	} catch (error) {
		res.status(500).json({ message: `Server error: ${error.message}` })
	}
})

// Soft search
router.get('/searchUsername/:username', async (req, res) => {
	const { username } = req.params

	try {
		const users = await User.find({ username: { $regex: username, $options: 'i' } })
		if (!users) {
			return res.status(404).json({ message: 'Levels were not found' })
		}

		const levels = await Promise.all(users.map((user) => Level.find({ _id: { $in: user.levels } })))
		res.status(200).json(levels.flat())
	} catch (error) {
		res.status(500).json({ message: `Server error: ${error.message}` })
	}
})

// Get level by levelId
router.get('/id/:levelId', async (req, res) => {
	const { levelId } = req.params
	try {
		const level = await Level.findById(levelId)
		res.status(200).json(level)
	} catch (error) {
		res.status(400).json(error)
	}
})

// Get all levels
router.get('/', async (req, res) => {
	try {
		const levels = await Level.find().sort({ createdAt: -1 })
		res.json(levels)
	} catch (error) {
		res.status(400).json({ message: "Couldn't load levels" })
	}
})

router.delete('/:levelId', authenticateToken, async (req, res) => {
	const { levelId } = req.params

	if (!req.user.levels.includes(levelId)) {
		return res.status(401).json({ message: 'Unauthorized to delete level' })
	}

	try {
		// Delete the level from the Levels collection
		await Level.findByIdAndDelete(levelId)

		// Delete the level from the user's levels field
		await User.findByIdAndUpdate(req.user._id, { $pull: { levels: levelId } })
		res.status(200).json({ message: `Deleted level ${levelId} successfuly` })
	} catch (error) {
		console.log(error)
		res.status(500).json(error)
	}
})

export default router
