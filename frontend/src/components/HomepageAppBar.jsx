import React, { useState } from 'react'
import {
	AppBar,
	Box,
	Toolbar,
	Typography,
	IconButton,
	MenuItem,
	Menu,
	TextField,
	Avatar,
} from '@mui/material'
import { AccountCircle, Menu as MenuIcon, Logout } from '@mui/icons-material'
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
			setAnchorEl(null)
			navigate('/')
		}
	}

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar
				position="fixed"
				sx={{
					width: { sm: `calc(100% - ${drawerWidth}px)` },
					ml: { sm: `${drawerWidth}px` },
					backgroundColor: 'rgb(50, 125, 170)',
				}}
			>
				<Toolbar sx={{ justifyContent: 'space-between' }}>
					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						<IconButton
							color="inherit"
							edge="start"
							onClick={handleDrawerToggle}
							sx={{ mr: 2, display: { sm: 'none' } }}
						>
							<MenuIcon />
						</IconButton>
						<Typography
							variant="h6"
							component="div"
							sx={{
								color: 'rgb(255, 255, 255)',
								fontWeight: 'bold',
								letterSpacing: '0.5px',
							}}
						>
							Hello {user ? user.username : 'Guest'}
						</Typography>
					</Box>

					<IconButton
						size="large"
						aria-label="account of current user"
						aria-controls="menu-appbar"
						aria-haspopup="true"
						onClick={handleMenu}
						color="inherit"
					>
						<Avatar
							sx={{
								width: 32,
								height: 32,
								bgcolor: 'rgb(80, 80, 82)',
								fontSize: '1.1rem',
								color: 'rgba(255, 255, 255, 0.85)',
							}}
						>
							{user ? user.username.charAt(0).toUpperCase() : 'G'}
						</Avatar>
					</IconButton>
					<Menu
						id="menu-appbar"
						anchorEl={anchorEl}
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'right',
						}}
						keepMounted
						transformOrigin={{
							vertical: 'top',
							horizontal: 'right',
						}}
						open={Boolean(anchorEl)}
						onClose={handleClose}
						sx={{
							'& .MuiPaper-root': {
								backgroundColor: 'rgb(50, 125, 170)',
								color: 'rgb(255, 255, 255)',
								boxShadow: '0 6px 9px rgba(0,0,0,0.25)',
							},
							'& .MuiMenuItem-root': {
								fontSize: 18,
								'&:hover': {
									backgroundColor: 'rgba(255, 255, 255, 0.08)',
								},
							},
						}}
					>
						<MenuItem onClick={handleClose} disabled>
							<AccountCircle style={{ marginRight: '8px' }} />
							Profile (Disabled)
						</MenuItem>
						<MenuItem onClick={handleSignOut}>
							<Logout style={{ marginRight: '8px' }} />
							Sign Out
						</MenuItem>
					</Menu>
				</Toolbar>
			</AppBar>
		</Box>
	)
}

export default HomepageAppBar
