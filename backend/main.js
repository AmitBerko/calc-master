import express from 'express'
import dotenv from 'dotenv'
import authRoute from './routes/authRoute.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { authenticateToken } from './routes/authRoute.js'
import mongoose from 'mongoose'

const app = express()
dotenv.config()
app.use(
	cors({
		origin: ['http://localhost:5173'],
		credentials: true,
	})
)

app.use(express.json())
app.use(cookieParser())
app.use('/auth', authRoute)

app.get('/guestRequest', async (req, res) => {
	console.log('in the guest request')
	res.send('guest')
})

app.post('/accountRequest', authenticateToken, async (req, res) => {
	console.log('here in the account request')
	console.log(req.user)
	res.json(req.user)
})

mongoose.connect(process.env.MONGO_CONNECTION_STRING).then(() => {
	console.log('connected to db')

	app.listen(8080, () => {
		console.log('listening on port 8080')
	})
})
