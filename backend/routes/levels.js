import express from 'express'
import Level from '../models/levelModel.js'
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
		console.log(newLevel)
		res.status(201).json({ message: 'Level saved successfuly' })
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
})

export default router
