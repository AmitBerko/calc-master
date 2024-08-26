import axios from 'axios'

const api = axios.create({
	baseURL:
		import.meta.env.VITE_APP_ENV === 'production'
			? 'https://calcmaster-backend-sq5x.onrender.com'
			: 'http://localhost:8080',
	// timeout: 5000,
	withCredentials: true,
	_retry: true, // By default retry the request after getting a new token
})

api.interceptors.request.use((config) => {
	let accessToken = localStorage.getItem('accessToken')
	if (accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`
	}
	return config
})

const logoutEvent = new Event('logout')

api.interceptors.response.use(
	(response) => {
		return response
	},
	async (error) => {
		const originalRequest = error.config
		if (error.name === 'CanceledError') {
			return Promise.reject(error)
		} else if (error.response.status === 401 && originalRequest._retry) {
			// If unauthorized and a retry didn't happen after a token refresh
			originalRequest._retry = false
			try {
				const response = await api.get('/auth/refresh-access-token')
				const newToken = response.data
				localStorage.setItem('accessToken', newToken)
				originalRequest.headers.Authorization = `Bearer ${newToken}`

				return api(originalRequest) // Retry the request
			} catch (error) {
				console.log(`Error when refreshing token: ${error}`)
				window.dispatchEvent(logoutEvent)
				return Promise.reject(error)
			}
		}
		return Promise.reject(error)
	}
)

export default api
