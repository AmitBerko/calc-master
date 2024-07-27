import axios from 'axios'

const api = axios.create({
	baseURL: 'http://localhost:8080',
	// timeout: 5000,
	withCredentials: true,
})

api.interceptors.request.use((config) => {
	let accessToken = localStorage.getItem('accessToken')
	if (accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`
	}
	return config
})

api.interceptors.response.use(
	(response) => {
		return response
	},
	async (error) => {
		const originalRequest = error.config

		// If unauthorized and a retry didn't happen after a token refresh
		if (error.response.status === 401 && !originalRequest._retried) {
			originalRequest._retried = true
			console.log('asking for a new access token')
			try {
				console.log('FETCHING A NEW TOKEN')
				const response = await api.get('/auth/refresh-access-token')
				const newToken = response.data
				localStorage.setItem('accessToken', newToken)
        console.log(newToken)
				originalRequest.headers.Authorization = `Bearer ${newToken}`

				return api(originalRequest) // Retry the request
			} catch (error) {
				console.log(`Error when refreshing token: ${error}`)
				return Promise.reject(error)
			}
		}
		return Promise.reject(error)
	}
)

export default api
