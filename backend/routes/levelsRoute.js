import express from 'express'
import Level from '../models/levelModel.js'
import User from '../models/userModel.js'
import { authenticateToken } from './authRoute.js'

const router = express.Router()

router.post('/', authenticateToken, async (req, res) => {
	const { buttons, originalSettings, creatorName } = req.body

	try {
		// const creationDate = new Date()
		const newLevel = new Level({
			buttons,
			originalSettings,
			currentSettings: originalSettings,
			creatorName,
		})
		await newLevel.save()
		const levelId = newLevel._id
		const userId = req.user._id
		await User.findByIdAndUpdate(userId, { $push: { levels: levelId } }, { new: true })

		res.status(201).json({ message: 'Level saved successfuly' })
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
})

router.get('/me', authenticateToken, async (req, res) => {
	try {
		const levelIds = req.user.levels

		if (!levelIds) {
			return res.status(404).json({ message: 'Levels were not found' })
		}

		const levels = await Level.find({ _id: { $in: levelIds } })
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

		const levels = await Promise.all(
			users.map((user) => Level.find({ _id: { $in: user.levels } }))
		)
		res.status(200).json(levels.flat())
	} catch (error) {
		res.status(500).json({ message: `Server error: ${error.message}` })
	}
})

router.get('/id/:levelId', async (req, res) => {
	const { levelId } = req.params
	try {
		const level = await Level.findById(levelId)
		res.status(200).json(level)
	} catch (error) {
		res.status(400).json(error)
	}
})

export default router
