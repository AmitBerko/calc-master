import express from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/UserModel.js'
import bcrypt from 'bcrypt'

const router = express.Router()
const saltRounds = 10
let refreshTokens = [] // Change to mongo or redis later

router.post('/register', async (req, res) => {
	const { email, username, password } = req.body

	// Create a user in the db
	try {
		let duplicates = []
		const doesEmailExist = await User.findOne({ email })
		if (doesEmailExist) {
			duplicates.push('email')
		}

		const doesUsernameExist = await User.findOne({ username })
		if (doesUsernameExist) {
			duplicates.push('username')
		}

    if (duplicates.length > 0) {
      throw {error: 'Duplication error', duplicates}
    }
		const hashedPassword = await bcrypt.hash(password, saltRounds)
		const newUser = new User({ email, username, hashedPassword })
		await newUser.save()

		const userObject = newUser.toObject()
		delete userObject.hashedPassword // Rather not send it to the frontend

		const { accessToken, refreshToken } = generateTokensAndSetCookie(userObject._id, res)
		refreshTokens.push({ email, refreshToken })
		res.status(200).json({ accessToken, user: userObject })
	} catch (error) {
		res.status(400).json(error)
	}
})

router.post('/login', async (req, res) => {
	const { email, password } = req.body
	try {
		const user = await User.findOne({ email })
		if (!user) {
			return res.status(401).json({ error: 'Invalid email or password' })
		}

		const doesPasswordMatch = await bcrypt.compare(password, user.hashedPassword)
		if (!doesPasswordMatch) {
			return res.status(401).json({ error: 'Invalid email or password' })
		}

		const { accessToken, refreshToken } = generateTokensAndSetCookie(user._id, res)
		const userObject = user.toObject()
		delete userObject.hashedPassword

		refreshTokens.push({ email, refreshToken })
		res.json({ accessToken, user: userObject })
	} catch (error) {
		console.log(`error is ${error}`)
		res.status(500).json({ error: 'Internal server error' })
	}
})

router.get('/refreshTokens', async (req, res) => {
	res.json(refreshTokens)
})

router.post('/logout', async (req, res) => {
	try {
		const refreshToken = req.cookies.refreshToken

		// Delete the refresh token from the db
		refreshTokens = refreshTokens.filter((user) => user.refreshToken !== refreshToken)

		res.clearCookie('refreshToken')
		res.status(200).json({ message: 'Logged out successful' })
	} catch (error) {
		res.status(400).json({ error: `Error logging out: ${error}` })
	}
})

router.get('/refresh-access-token', async (req, res) => {
	const refreshToken = req.cookies.refreshToken
	if (!refreshToken) {
		return res.status(400).json({ error: 'Refresh token was not found' })
	}
	try {
		const user = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
		const newAccessToken = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET, {
			expiresIn: '30m',
		})

		res.status(200).json(newAccessToken)
	} catch (error) {
		res.status(400).json({ error: 'Refresh token is not valid' })
	}
})

router.post('/getUser', authenticateToken, async (req, res) => {
	try {
		console.log('user is', req.user)
		res.status(200).json(req.user)
	} catch (error) {
		res.status(401).json(error)
	}
})

// router.post('/updateUser', authenticateToken, async (req, res) => {
// 	console.log(req.user)
// 	const updatedValues = req.body
// 	console.log(updatedValues)
// 	try {
// 		const newUser = await User.findByIdAndUpdate(req.user._id, updatedValues, { new: true })
// 		res.status(200).json(newUser)
// 	} catch (error) {
// 		res.status(401).json({ error: 'Unauthorized' })
// 	}
// })

// Use this middleware on actions that require an account
function authenticateToken(req, res, next) {
	const authHeader = req.headers['authorization']
	const token = authHeader && authHeader.split(' ')[1]

	if (!token) return res.status(401).json({ error: 'Access token was not found' })

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
		if (err) return res.status(401).json({ error: 'Unauthorized' })

		req.user = await User.findById(user._id).select('-hashedPassword')
		next()
	})
}

function generateTokensAndSetCookie(userId, res) {
	const accessToken = jwt.sign({ _id: userId }, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: '30m',
	})
	const refreshToken = jwt.sign({ _id: userId }, process.env.REFRESH_TOKEN_SECRET, {
		expiresIn: '7d',
	})

	res.cookie('refreshToken', refreshToken, {
		httpOnly: true,
		// secure: true,
		sameSite: 'strict',
		maxAge: 7 * 24 * 60 * 60 * 1000, // 7 Days
	})

	return { accessToken, refreshToken }
}

export { authenticateToken }

export default router
