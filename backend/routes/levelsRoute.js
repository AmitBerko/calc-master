import express from 'express'
import Level from '../models/levelModel.js'
import User from '../models/userModel.js'
import { authenticateToken } from './authRoute.js'

const router = express.Router()

router.post('/', authenticateToken, async (req, res) => {
	const { buttons, originalSettings } = req.body

	try {
		const newLevel = new Level({
			buttons,
			originalSettings,
			currentSettings: originalSettings,
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

router.get('/:username', async (req, res) => {
	const { username } = req.params
	console.log('username is', username)
	try {
		const user = await User.findOne({ username })
		console.log('user is', user)
		if (!user) {
			return res.status(404).json({ message: 'User not found' })
		}

		const levels = await Level.find({ _id: { $in: user.levels } })
		res.status(200).json(levels)
		console.log('levels are', levels)
	} catch (error) {
		//
	}
})

export default router
