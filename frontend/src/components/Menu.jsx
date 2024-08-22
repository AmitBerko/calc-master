import React from 'react'
import { Box, Grid, Link, Typography } from '@mui/material'
import { Create, LibraryBooks, Search } from '@mui/icons-material'
import MenuCard from './MenuCard'

function Menu({ setSelectedComponent }) {
	return (
		<Box sx={{ padding: 4 }}>
			<Typography variant="h3" fontWeight={500} textAlign={'center'} gutterBottom>
				Welcome to CalcMaster
			</Typography>
			<Typography variant="body1" color="text.secondary" fontSize={'1.1rem'} gutterBottom>
				This project was inspired by the mobile game{' '}
				<Link
					underline="hover"
					href="https://apps.apple.com/us/app/calculator-the-game/id1243055750"
				>
					Calculator The Game
				</Link>
				. It allows you to design and customize your own levels, offering a variety of buttons and
				settings to create unique challenges at different difficulty levels. You can also share your
				creations and discover levels made by others.
			</Typography>

			<Grid container spacing={3} mt={2}>
				<Grid item xs={12} md={6}>
					<MenuCard
						avatar={<Create />}
						title="Level Creator"
						subheader="Design and build your own game levels"
						description="Create your own levels by selecting from a variety of buttons, customizing their behavior, and adjusting the level's settings to craft unique challenges."
						handleClick={() => setSelectedComponent('levelCreator')}
					/>
				</Grid>

				<Grid item xs={12} md={6}>
					<MenuCard
						avatar={<LibraryBooks />}
						title="My Levels"
						subheader="View and share your creations"
						description="Check out the levels you've built, play them, and share your favorites with others."
						handleClick={() => setSelectedComponent('myLevels')}
					/>
				</Grid>

				<Grid item xs={12} md={6}>
					<MenuCard
						avatar={<Search />}
						title="Level Explorer (Under Development)" // Suggested new name
						subheader="Discover and play levels created by other players"
						description="Search through levels created by other players, play them, and even rate them. Find the most popular levels or discover hidden gems."
						handleClick={() => setSelectedComponent('levelExplorer')}
					/>
				</Grid>
			</Grid>
		</Box>
	)
}

export default Menu
