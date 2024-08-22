import { Card, CardHeader, CardContent, Typography, CardActionArea } from '@mui/material'
import React from 'react'

function MenuCard({ avatar, title, subheader, description, handleClick }) {
	return (
		<Card
			elevation={0}
			sx={{ backgroundColor: 'rgb(40, 40, 40)', borderRadius: 2, height: '100%' }}
		>
			<CardActionArea
				elevation={20}
				sx={{ height: '100%' }}
				onClick={handleClick}
			>
				<CardHeader
					avatar={avatar}
					title={
						<Typography variant="h6" sx={{ fontSize: '1.25rem', fontWeight: '500' }}>
							{title}
						</Typography>
					}
					subheader={
						<Typography variant="subtitle2" sx={{ fontSize: '0.9rem' }}>
							{subheader}
						</Typography>
					}
				/>
				<CardContent>
					<Typography variant="body2" sx={{ fontSize: '1rem', color: 'rgba(255, 255, 255, 0.75)' }}>
						{description}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	)
}

export default MenuCard
