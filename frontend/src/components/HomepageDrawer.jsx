import React from 'react'
import { Box, Divider, Drawer, IconButton, Link, List, Toolbar, Typography } from '@mui/material'
import DrawerItem from './DrawerItem'
import {
	Search,
	Create,
	Home,
	Info,
	Person,
	KeyboardArrowLeft,
	LibraryBooks,
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

const drawerWidth = 190

function HomepageDrawer({
	mobileOpen,
	setMobileOpen,
	setIsClosing,
	selectedComponent,
	setSelectedComponent,
}) {
	const navigate = useNavigate()
	const handleDrawerClose = () => {
		setIsClosing(true)
		setMobileOpen(false)
	}

	const handleDrawerTransitionEnd = () => {
		setIsClosing(false)
	}

	const onDrawerClick = () => {
		navigate('/homepage')
		handleDrawerClose()
	}

	const drawer = (
		<Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
			<Box sx={{ p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
				<Typography variant="h6" sx={{ color: 'rgb(255, 255, 255)', fontWeight: 'bold' }}>
					CalcMaster
				</Typography>
				<IconButton
					onClick={handleDrawerClose}
					sx={{
						display: { xs: 'flex', sm: 'none' },
						color: 'rgb(200, 200, 200)',
						'&:hover': { color: 'rgb(255, 255, 255)' },
					}}
				>
					<KeyboardArrowLeft />
				</IconButton>
			</Box>

			<Divider />

			<List disablePadding onClick={onDrawerClick} sx={{ flexGrow: 1 }}>
				<DrawerItem
					text="Menu"
					icon={Home}
					onClick={() => setSelectedComponent('menu')}
					isSelected={selectedComponent === 'menu'}
				/>
				<DrawerItem
					text="Tutorial"
					icon={Info}
					onClick={() => setSelectedComponent('tutorial')}
					isSelected={selectedComponent === 'tutorial'}
				/>
				<DrawerItem
					text="Level Creator"
					icon={Create}
					onClick={() => setSelectedComponent('levelCreator')}
					isSelected={selectedComponent === 'levelCreator'}
				/>
				<DrawerItem
					text="Level Explorer"
					icon={Search}
					onClick={() => setSelectedComponent('levelExplorer')}
					isSelected={selectedComponent === 'levelExplorer'}
				/>
				<DrawerItem text="About Me" icon={Person} />
			</List>
			<Divider />
			<Box sx={{ p: 2 }}>
				<Typography
					variant="caption"
					sx={{
						color: 'rgb(150, 150, 150)',
						display: 'flex',
						justifyContent: 'center',
						fontSize: '0.85rem',
					}}
				>
					<Link
						underline="hover"
						href="https://github.com/AmitBerko"
						target="_blank"
						sx={{ color: 'inherit' }}
					>
						© Amit Berko
					</Link>
				</Typography>
			</Box>
		</Box>
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
						backgroundColor: 'rgb(0, 0, 0)',
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
