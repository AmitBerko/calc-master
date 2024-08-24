import express from 'express'
import Level from '../models/levelModel.js'
import User from '../models/userModel.js'
import { authenticateToken } from './authRoute.js'

const router = express.Router()

// Create a new level
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
    const levels = await Level.find()
    res.json(levels)
  } catch (error) {
    res.status(400).json({message: "Couldn't load levels"})
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
		await User.findByIdAndUpdate(
			req.user._id,
			{ $pull: { levels: levelId } },
		)
		res.status(200).json({message: `Deleted level ${levelId} successfuly`})
	} catch (error) {
		console.log(error)
		res.status(500).json(error)
	}
})

export default router
