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
				if (!accessToken) {
					// No token found, user is not logged in
					setUser(null)
					setIsLoading(false)
					return
				}

				const response = await api.post('/auth/getUser', { accessToken })

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

    window.addEventListener('logout', logout)

    return () => {
      window.removeEventListener('logout', logout)
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

	return (
		<AuthContext.Provider value={{ user, declareUser, logout }}>
			{isLoading ? <div>loading...</div> : children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => useContext(AuthContext)

export default AuthProvider
