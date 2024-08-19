import React, { useState } from 'react'
import { AppBar, Box, Toolbar, Typography, IconButton, MenuItem, Menu, TextField } from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle'
import MenuIcon from '@mui/icons-material/Menu'
import { useNavigate } from 'react-router-dom'
import api from '../axios'
import { useAuth } from './AuthProvider'

const drawerWidth = 190

function HomepageAppBar({ handleDrawerToggle }) {
  const navigate = useNavigate()
  const { logout, user } = useAuth()
	const [anchorEl, setAnchorEl] = useState(null)

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	async function handleSignOut() {
		try {
			const response = await api.post('/auth/logout')
			console.log(response.data)
			logout()
		} catch (error) {
			console.log(`error is`, error)
		} finally {
			navigate('/')
		}

		setAnchorEl(null)
	}

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar
				position="fixed"
				sx={{
					width: { sm: `calc(100% - ${drawerWidth}px)` },
					ml: { sm: `${drawerWidth}px` },
					backgroundColor: 'rgb(40, 140, 190)',
				}}
			>
				<Toolbar sx={{color: 'white'}}>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { sm: 'none' } }}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						Hello "{user && user.username}"
					</Typography>
					<div>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleMenu}
							color="inherit"
						>
							<AccountCircle />
						</IconButton>
						<Menu
							sx={{
								'& .MuiPaper-root': { backgroundColor: 'rgb(40, 140, 190)', color: 'white' },
								'& .MuiMenuItem-root': { fontSize: 17.5 },
							}}
							id="menu-appbar"
							anchorEl={anchorEl}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={Boolean(anchorEl)}
							onClose={handleClose}
						>
							<MenuItem onClick={handleClose}>Profile</MenuItem>
							<MenuItem onClick={handleClose}>My account</MenuItem>
							<MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
						</Menu>
					</div>
				</Toolbar>
			</AppBar>
		</Box>
	)
}

export default HomepageAppBar
