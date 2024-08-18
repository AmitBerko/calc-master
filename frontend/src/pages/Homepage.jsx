import React, { useState } from 'react'
import { Box } from '@mui/material'
import HomepageDrawer from '../components/HomepageDrawer'
import HomepageAppBar from '../components/HomepageAppBar'
import GameScreen from '../components/LevelCreator/GameScreen'
import LevelCreatorProvider from '../components/LevelCreator/LevelCreatorProvider'
import MyLevels from '../components/MyLevels'

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
				setSelectedComponent={setSelectedComponent}
			/>

			<Box
				component="main"
				sx={{
					marginTop: { xs: '3.5rem', sm: '4rem' },
					width: { xs: '100%', sm: `calc(100% - ${drawerWidth}px)` },
					height: {
						xs: 'calc(100vh - 3.5rem)',
						sm: 'calc(100vh - 4rem)',
					},

					// Use dvh units only if it is supported
					'@supports (height: 100dvh)': {
						height: { xs: 'calc(100dvh - 3.5rem)', sm: 'calc(100dvh - 4rem)' },
					},
				}}
			>
				<LevelCreatorProvider>
					{selectedComponent === 'levelCreator' && <GameScreen />}
					{selectedComponent === 'myLevels' && <MyLevels />}
				</LevelCreatorProvider>

				{selectedComponent === 'tutorial' && <div>tutorial</div>}
			</Box>
		</Box>
	)
}

export default Homepage
