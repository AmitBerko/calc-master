import React from 'react'
import { Box, Divider, Drawer, IconButton, List, Toolbar } from '@mui/material'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import DrawerItem from './DrawerItem'
import { Search, Create, Home, Info, Person } from '@mui/icons-material'

const drawerWidth = 190

function HomepageDrawer({ mobileOpen, setMobileOpen, setIsClosing }) {
	const handleDrawerClose = () => {
		setIsClosing(true)
		setMobileOpen(false)
	}

	const handleDrawerTransitionEnd = () => {
		setIsClosing(false)
	}

	const drawer = (
		<div>
			<Toolbar sx={{ display: 'flex', justifyContent: 'end' }}>
				<IconButton
					onClick={() => handleDrawerClose()}
					sx={{ display: { xs: 'flex', sm: 'none' } }}
				>
					<KeyboardArrowLeftIcon sx={{ color: 'white', fontSize: '2rem' }} />
				</IconButton>
			</Toolbar>
			<Divider />
			<List disablePadding>
				<DrawerItem text="Menu" icon={Home} />
				<DrawerItem text="Tutorial" icon={Info} />
				<DrawerItem text="Level Creator" icon={Create} />
				<DrawerItem text="Search Levels" icon={Search} />
				<DrawerItem text="About Me" icon={Person} />
			</List>
			<Divider />
		</div>
	)

	return (
		<Box
			component="nav"
			sx={{ width: { sm: drawerWidth }, flexShrink: { xs: 0 } }}
			aria-label="mailbox folders"
		>
			{/* Phone's drawer */}
			<Drawer
				variant="temporary"
				open={mobileOpen}
				onTransitionEnd={handleDrawerTransitionEnd}
				onClose={handleDrawerClose}
				ModalProps={{
					keepMounted: true, // Better open performance on mobile.
				}}
				sx={{
					display: { xs: 'block', sm: 'none' },
					'& .MuiDrawer-paper': {
						width: drawerWidth,
						backgroundColor: 'rgb(40, 40, 40)',
					},
				}}
			>
				{drawer}
			</Drawer>

			{/* PC's drawer */}
			<Drawer
				variant="permanent"
				sx={{
					display: { xs: 'none', sm: 'block' },
					'& .MuiDrawer-paper': {
						width: drawerWidth,
						backgroundColor: 'rgb(40, 40, 40)',
					},
				}}
				open
			>
				{drawer}
			</Drawer>
		</Box>
	)
}

export default HomepageDrawer
