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
					marginTop: { xs: '4.75rem', sm: '5.25rem' },
					marginLeft: { lg: '1.25rem' },
					display: 'flex',
					justifyContent: { xs: 'center', lg: 'start' },
					width: { xs: '100%', sm: `calc(100% - ${drawerWidth}px)` },
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
