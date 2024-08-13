import React, { useState } from 'react'
import { Box, Toolbar } from '@mui/material'
import HomepageDrawer from '../components/HomepageDrawer'
import HomepageAppBar from '../components/HomepageAppBar'
import LevelCreator from '../components/LevelCreator/LevelCreator'
import LevelCreatorProvider from '../components/LevelCreator/LevelCreatorProvider'

const drawerWidth = 190

function Homepage() {
	const [mobileOpen, setMobileOpen] = useState(false)
	const [isClosing, setIsClosing] = useState(false)
	const [selectedComponent, setSelectedComponent] = useState('levelCreator')

	const handleDrawerToggle = () => {
		if (!isClosing) {
			setMobileOpen(!mobileOpen)
		}
	}

	return (
		<Box sx={{ display: 'flex' }}>
			<HomepageAppBar handleDrawerToggle={handleDrawerToggle} />

			<HomepageDrawer
				mobileOpen={mobileOpen}
				setMobileOpen={setMobileOpen}
				setIsClosing={setIsClosing}
			/>

			<Box
				component="main"
				sx={{
					marginTop: { xs: '3.5rem', sm: '4rem'},
					width: { xs: '100%', sm: `calc(100% - ${drawerWidth}px)` },
					height: {
						xs: 'calc(100vh - 3.5rem)',
						sm: 'calc(100vh - 4rem)',
					},
				}}
			>
				{selectedComponent === 'levelCreator' && (
					<LevelCreatorProvider>
						<LevelCreator />
					</LevelCreatorProvider>
				)}
			</Box>
		</Box>
	)
}

export default Homepage
