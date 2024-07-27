import React from 'react'
import { useAuth } from './AuthProvider'
import { Navigate } from 'react-router-dom'

function GuestsOnlyRoute({ component: Component, ...props }) {
	const { user } = useAuth()

	return (
		// If a user exists, redirect them to the homepage
		user ? <Navigate to="/homepage" /> : <Component {...props} />
	)
}

export default GuestsOnlyRoute
