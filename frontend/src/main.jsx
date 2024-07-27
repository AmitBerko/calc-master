import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/styles.scss'
import AuthForm from './pages/AuthForm/AuthForm.jsx'
import theme from './themes/theme.jsx'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomepageTest from './pages/HomepageTest.jsx'
import AuthProvider from './components/AuthProvider.jsx'

const router = createBrowserRouter([
	{
		path: '/',
		element: <AuthForm mode="login" />,
	},
	{
		path: '/register',
		element: <AuthForm mode="register" />,
	},
	{
		path: '/homepage',
		element: <HomepageTest />,
	},
])

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<AuthProvider>
				<RouterProvider router={router} />
			</AuthProvider>
		</ThemeProvider>
	</React.StrictMode>
)
