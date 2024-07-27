import React from 'react'
import api from '../axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../components/AuthProvider'

function HomepageTest() {
	const navigate = useNavigate()

	const { user, updateUser, logout } = useAuth()

	async function handleGuest() {
		const response = await api.get('/guestRequest')
		console.log(response.data)
	}

	async function handleAccount() {
		const accessToken = localStorage.getItem('accessToken')
		const response = await api.post('/auth/getUser', { accessToken })
		console.log(response.data)
	}

	async function handleLogout() {
		try {
			const response = await api.post('/auth/logout')
			console.log(response.data)
			logout()
		} catch (error) {
      console.log(`error is`, error)
		} finally {
			navigate('/')
		}
	}

	async function handleGetTokens() {
		const accessToken = localStorage.getItem('accessToken')
		const response = await api.get('/auth/refreshTokens', { accessToken })
		console.log(response.data)
	}

	async function editUser() {
		await updateUser({ username: 'gilbasim' })
	}

	return (
		<div>
			<button onClick={handleGuest}>Guest button</button>
			<button onClick={handleAccount}>Account button</button>
			<button onClick={handleLogout}>Logout button</button>
			<button onClick={handleGetTokens}>Print Tokens button</button>
			<button onClick={editUser}>Update user button</button>

			{JSON.stringify(user)}
		</div>
	)
}

export default HomepageTest
