import React, { useEffect, useRef, useState } from 'react'
import {
	Box,
	Button,
	Chip,
	Container,
	Divider,
	Grid,
	Link,
	TextField,
	Typography,
} from '@mui/material'
import api from '../../axios'
import GoogleIcon from '@mui/icons-material/Google'
import { useNavigate } from 'react-router-dom'

function AuthForm({ mode = 'login' }) {
	const [email, setEmail] = useState('')
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [errors, setErrors] = useState({ email: '', username: '', password: '' })
	const [isLoading, setIsLoading] = useState(true)
	const initialized = useRef(false)

	const navigate = useNavigate()

	// Check if the user should be redirected to the homepage
	useEffect(() => {
		const validateToken = async () => {
			try {
				const accessToken = localStorage.getItem('accessToken')
				const response = await api.post('/auth/getUser', { accessToken })
				console.log(response)
        navigate('/homepage')
			} catch (error) {
				// If there is an error it means the user is not logged in
        console.log('error:   a', error)
			}
		}

		if (!initialized.current) {
			initialized.current = true
			validateToken()
		}
	}, [navigate])

	const validateEmail = (email) => {
		// Regex for email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		return emailRegex.test(email)
	}

	function validator() {
		setErrors({ email: '', username: '', password: '' })

		const validationErrors = {
			email: !validateEmail(email) ? 'Invalid email' : '',
			username:
				username.length <= 3
					? 'Username must have a minimum of 4 letters'
					: username.length >= 11
					? 'Username must have a maximum of 10 letters'
					: '',
			password: password.length <= 5 ? 'Password must have a minimum of 6 characters' : '',
		}

		setErrors(validationErrors)
		return validationErrors
	}

	async function handleLogin(e) {
		// Add duplications check for email and username soon

		e.preventDefault()
		const validationErrors = validator()
		if (validationErrors.email || validationErrors.password) {
			console.log('Returned')
			return
		}

		// Login
		const response = await api.post('/auth/login', { email, password })
		const accessToken = response.data
		localStorage.setItem('accessToken', accessToken)
		navigate('/homepage')
	}

	async function handleRegister(e) {
		e.preventDefault()
		const validationErrors = validator()
		if (validationErrors.email || validationErrors.username || validationErrors.password) {
			console.log('Returned')
			return
		}

		try {
			const response = await api.post('/auth/register', { email, username, password })
			const accessToken = response.data
			localStorage.setItem('accessToken', accessToken)
			navigate('/homepage')
		} catch (error) {
			if (error.response.data.includes('already exists')) {
				if (error.response.data.includes('email')) {
					setErrors((prevErrors) => ({ ...prevErrors, email: 'Email already exists' }))
				} else if (error.response.data.includes('username')) {
					setErrors((prevErrors) => ({ ...prevErrors, username: 'Username already exists' }))
				}
			} else {
				console.log('unknown error: ', error)
			}
		}
	}

	return (
		<Container
			sx={{
				width: '100vw',
				height: {
					xs: '90vh',
					sm: '100vh',
				},
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				textAlign: 'center',
			}}
		>
			<Typography
				variant="h3"
				sx={{ fontWeight: 500, marginBottom: mode === 'login' ? 2.5 : 3.75 }}
			>
				{mode === 'login' ? 'Login' : 'Register'} To CalcMaster
			</Typography>
			<Box
				maxWidth={420}
				component="form"
				onSubmit={(e) => (mode === 'login' ? handleLogin(e) : handleRegister(e))}
			>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<TextField
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							color="secondary"
							label="Email"
							fullWidth
							error={errors.email ? true : false}
							helperText={errors.email}
						/>
					</Grid>
					{mode === 'register' && (
						<Grid item xs={12}>
							<TextField
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								error={errors.username ? true : false}
								helperText={errors.username}
								color="secondary"
								label="Username"
								fullWidth
							/>
						</Grid>
					)}
					<Grid item xs={12}>
						<TextField
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							color="secondary"
							type="password"
							label="Password"
							error={errors.password ? true : false}
							helperText={errors.password}
							fullWidth
						/>
					</Grid>
					<Grid item xs={12}>
						<Button variant="contained" type="submit" fullWidth>
							{mode === 'login' ? 'Login' : 'Register'}
						</Button>
					</Grid>
					<Grid item xs={12}>
						<Typography variant="body1">
							{mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
							<Link
								href={mode === 'login' ? '/register' : '/'}
								variant="body1"
								color="primary"
								underline="none"
							>
								{mode === 'login' ? 'Register' : 'Login'}
							</Link>
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<Divider
							sx={{
								'&:before, &:after': {
									borderColor: 'rgba(200, 200, 200, 0.7)',
								},
								// marginBottom: 0
							}}
						>
							<Chip label="OR" sx={{ backgroundColor: 'rgba(200, 200, 200, 0.7)' }} />
						</Divider>
					</Grid>

					<Grid item xs={12} alignItems={'center'}>
						<Button variant="contained" color="error" fullWidth startIcon={<GoogleIcon />}>
							Continue with google
						</Button>
					</Grid>
					<Grid item xs={12}>
						<Button variant="outlined" color="secondary" fullWidth>
							Play as a guest
						</Button>
					</Grid>
				</Grid>
			</Box>
		</Container>
	)
}

export default AuthForm
