import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import HomepageDrawer from '../components/HomepageDrawer'
import HomepageAppBar from '../components/HomepageAppBar'
import PlayLevel from '../components/LevelCreator/PlayLevel'
import LevelCreatorProvider from '../components/LevelCreator/LevelCreatorProvider'
import MyLevels from '../components/MyLevels'
import { useNavigate, useParams } from 'react-router-dom'
import LevelCreator from '../components/LevelCreator/LevelCreator'

const drawerWidth = 190

function Homepage() {
	const { levelId } = useParams()
	const [mobileOpen, setMobileOpen] = useState(false)
	const [isClosing, setIsClosing] = useState(false)
	const [selectedComponent, setSelectedComponent] = useState('menu')

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

        {/* If levelId exists, render the PlayLevel component */}
				{levelId ? (
					<PlayLevel levelId={levelId} />
				) : (
					<>
						{selectedComponent === 'levelCreator' && (
							<Box
								sx={{
									display: 'flex',
									height: '100%',
									flexDirection: 'column',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<LevelCreator />
							</Box>
						)}
						{selectedComponent === 'myLevels' && <MyLevels />}
						{selectedComponent === 'menu' && <div>menu</div>}
						{selectedComponent === 'tutorial' && <div>tutorial</div>}
					</>
				)}
			</Box>
		</Box>
	)
}

export default Homepage
