import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import api from '../axios'

const AuthContext = createContext()

function AuthProvider({ children }) {
	const [user, setUser] = useState(null)
	const [isLoading, setIsLoading] = useState(true)
	const initialized = useRef(false)

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const accessToken = localStorage.getItem('accessToken')
				const response = await api.post('/auth/getUser', { accessToken })

				console.log(`the response.data is`, response.data)
				if (!response.data) {
					setUser(null)
				} else {
					setUser(response.data)
				}
			} catch (error) {
        // No access or refresh tokens found
			} finally {
				setIsLoading(false)
			}
		}
		if (!initialized.current) {
			initialized.current = true
			fetchUser()
		}
	}, [])

	async function declareUser(user, accessToken) {
		setUser(user)
		localStorage.setItem('accessToken', accessToken)
	}

	async function logout() {
		setUser(null)
		localStorage.removeItem('accessToken')
	}

	async function updateUser(updatedValues) {
		setUser((prevUser) => ({ ...prevUser, ...updatedValues }))
		await api.post('/auth/updateUser', updatedValues)
	}

	return (
		<AuthContext.Provider value={{ user, declareUser, logout, updateUser }}>
			{isLoading ? <div>loading...</div> : children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => useContext(AuthContext)

export default AuthProvider
