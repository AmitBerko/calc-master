import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/styles.scss'
import AuthForm from './pages/AuthForm/AuthForm.jsx'
import theme from './themes/theme.jsx'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthProvider from './components/AuthProvider.jsx'
import GuestsOnlyRoute from './components/GuestsOnlyRoute.jsx'
import Homepage from './pages/Homepage.jsx'
import LevelCreatorProvider from './components/LevelCreator/LevelCreatorProvider.jsx'

const router = createBrowserRouter([
	{
		path: '/',
		element: <GuestsOnlyRoute component={AuthForm} mode="login" />,
	},
	{
		path: '/register',
		element: <GuestsOnlyRoute component={AuthForm} mode="register" />,
	},
	{
		path: '/homepage',
		element: <Homepage />,
	},
	{
		path: '/play/:levelId',
		element: <Homepage />,
	},
])

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<AuthProvider>
				<LevelCreatorProvider>
					<RouterProvider router={router} />
				</LevelCreatorProvider>
			</AuthProvider>
		</ThemeProvider>
	</React.StrictMode>
)
