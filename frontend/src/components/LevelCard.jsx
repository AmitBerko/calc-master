import { Card, CardContent, Typography, Button, Box, Avatar } from '@mui/material'
import React from 'react'
import { formatDistanceToNowStrict } from 'date-fns'
import { PlayCircle, Delete } from '@mui/icons-material'

function LevelCard({ onPlay, isMyLevel, createdAt, creatorName }) {
	const onDelete = () => {} // Do it later

	return (
		<Card
			elevation={3}
			sx={{
				backgroundColor: 'rgb(30, 30, 30)',
				borderRadius: 2,
				overflow: 'hidden',
				transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
				'&:hover': {
					transform: 'translateY(-2px)',
					boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
				},
        width: '100%',
				maxWidth: '400px',
			}}
		>
			<CardContent sx={{ p: 2 }}>
				<Typography variant="h6" gutterBottom sx={{ color: 'white', textAlign: 'center' }}>
					{isMyLevel ? 'Your Level' : `${creatorName}'s Level`}
				</Typography>
				<Typography
					variant="body2"
					sx={{ color: 'rgb(180, 180, 180)', mb: 2, textAlign: 'center' }}
				>
					Created {formatDistanceToNowStrict(new Date(createdAt), { addSuffix: true })}
				</Typography>
				<Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
					<Button
						variant="contained"
						startIcon={<PlayCircle size={16} />}
						onClick={onPlay}
						sx={{
							bgcolor: 'rgb(0, 150, 136)',
							'&:hover': { bgcolor: 'rgb(0, 180, 160)' },
							flex: 1,
							mr: isMyLevel ? 1 : 0,
						}}
					>
						Play
					</Button>
					{isMyLevel && (
						<Button
							variant="outlined"
							startIcon={<Delete size={16} />}
							onClick={onDelete}
							sx={{
								color: 'rgb(255, 99, 71)',
								borderColor: 'rgb(255, 99, 71)',
								'&:hover': {
									bgcolor: 'rgba(255, 99, 71, 0.1)',
									borderColor: 'rgb(255, 99, 71)',
								},
								flex: 1,
								ml: 1,
							}}
						>
							Delete
						</Button>
					)}
				</Box>
			</CardContent>
		</Card>
	)
}

export default LevelCard
