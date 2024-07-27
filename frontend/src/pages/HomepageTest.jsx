import React from 'react'
import api from '../axios'
import { useNavigate } from 'react-router-dom'

function HomepageTest() {
  const navigate = useNavigate()
	async function handleGuest() {
		const response = await api.get('/guestRequest')
		console.log(response.data)
	}

	async function handleAccount() {
		const response = await api.post('/accountRequest', { test: 123 })
		console.log(response.data)
	}

	async function handleRefresh() {
		const response = await api.get('/auth/refresh-access-token')
		console.log(response.data)
	}

	async function handleLogout() {
    console.log('logging out')
		const response = await api.post('/auth/logout')
    console.log(('logged out'))
    localStorage.removeItem('accessToken')
    console.log('removed access token')
    navigate('/')
		console.log(response.data)
	}

	async function handleGetTokens() {
		const accessToken = localStorage.getItem('accessToken')
		const response = await api.get('/auth/refreshTokens', { accessToken })
		console.log(response.data)
	}

	return (
		<div>
			<button onClick={handleGuest}>Guest button</button>
			<button onClick={handleAccount}>Account button</button>
			<button onClick={handleRefresh}>Refresh button</button>
			<button onClick={handleLogout}>Logout button</button>
			<button onClick={handleGetTokens}>Print Tokens button</button>
		</div>
	)
}

export default HomepageTest
