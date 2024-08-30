import React from 'react'
import { Box, Grid, Link, Typography } from '@mui/material'
import { Create, Search } from '@mui/icons-material'
import MenuCard from './MenuCard'

function Menu({ setSelectedComponent }) {
	return (
		<Box sx={{ padding: 4 }}>
			<Typography
				variant="h2"
				sx={{
					fontWeight: 700,
					textAlign: 'center',
					color: 'rgb(76, 167, 213)',
					marginBottom: '1rem',
					fontSize: { xs: '2.5rem', sm: '3.5rem', md: '3.75rem' },
					textShadow: '3px 3px 5px rgba(0,0,0,0.2)',
				}}
			>
				Welcome to CalcMaster
			</Typography>

			<Typography
				variant="body1"
				sx={{
					color: 'rgba(255, 255, 255, 0.9)',
					fontSize: '1.1rem',
					maxWidth: '1000px',
					margin: '0 auto 2rem',
					lineHeight: 1.75,
					'& a': {
						color: 'rgb(85,185,225)',
						textDecoration: 'none',
						fontWeight: 500,
						transition: 'color 0.3s ease',
						'&:hover': {
							color: 'rgb(65,165,205)',
							textDecoration: 'underline',
						},
					},
				}}
			>
				This project was inspired by the mobile game{' '}
				<Link href="https://apps.apple.com/us/app/calculator-the-game/id1243055750">
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
						avatar={<Search />}
						title="Level Explorer"
						subheader="Discover and play levels created by other players"
						description="Browse through levels created by other players and challenge yourself with unique gameplay experiences."
						handleClick={() => setSelectedComponent('levelExplorer')}
					/>
				</Grid>
			</Grid>
		</Box>
	)
}

export default Menu
