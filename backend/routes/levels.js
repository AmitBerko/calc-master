import express from 'express'
import Levels from '../models/levelsModel.js'

const router = express.Router()

router.post('/', async (req, res) => {
  // console.log(req.body)
	const { levelData } = req.body
	console.log(levelData.originalSettings)
})

export default router
