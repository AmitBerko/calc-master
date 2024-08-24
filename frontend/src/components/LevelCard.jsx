import {
	Card,
	CardContent,
	Typography,
	Button,
	Box,
	Grid,
	Divider,
	CircularProgress,
} from '@mui/material'
import React, { useState } from 'react'
import { formatDistanceToNowStrict } from 'date-fns'
import { PlayCircle, Delete, Flag, TouchApp, Assessment } from '@mui/icons-material'

function LevelCard({ onPlay, isMyLevel, createdAt, creatorName, originalSettings, onDelete }) {
	const [isDeleteLoading, setIsDeleteLoading] = useState(false)
  const handleDeleteButton = async () => {
    setIsDeleteLoading(true)
    await onDelete()
    setIsDeleteLoading(false)
  }
	return (
		<Card
			elevation={4}
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
				maxWidth: '500px',
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

				<LevelSettings originalSettings={originalSettings} />

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
							startIcon={isDeleteLoading ? null : <Delete size={16} />}
							onClick={handleDeleteButton}
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
							{isDeleteLoading ? (
								<CircularProgress size={22} thickness={6} color="error" />
							) : (
								'Delete'
							)}
						</Button>
					)}
				</Box>
			</CardContent>
		</Card>
	)
}

function LevelSettings({ originalSettings }) {
	return (
		<>
			<Box
				sx={{
					bgcolor: 'rgba(255, 255, 255, 0.08)',
					borderRadius: 2,
					p: 2,
					mb: 2,
					boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
				}}
			>
				<Typography
					variant="subtitle1"
					fontSize={18}
					sx={{
						color: 'rgb(220, 220, 220)',
						mb: 1,
						textAlign: 'center',
						fontWeight: 'bold',
					}}
				>
					Level Settings
				</Typography>
				<Divider sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)', mb: 2 }} />
				<Grid container spacing={2} sx={{ justifyContent: 'center' }}>
					<Grid item xs={12}>
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								bgcolor: 'rgba(255, 255, 255, 0.05)',
								borderRadius: 1,
								p: 1,
							}}
						>
							<Assessment size={20} />
							<Typography variant="body1" sx={{ color: 'rgb(200, 200, 200)', ml: 2, flexGrow: 1 }}>
								Initial Result:
							</Typography>
							<Typography variant="body1" sx={{ color: 'rgb(255, 255, 255)', fontWeight: 'bold' }}>
								{originalSettings.result}
							</Typography>
						</Box>
					</Grid>
					<Grid item xs={12}>
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								bgcolor: 'rgba(255, 255, 255, 0.05)',
								borderRadius: 1,
								p: 1,
							}}
						>
							<TouchApp size={20} />
							<Typography variant="body1" sx={{ color: 'rgb(200, 200, 200)', ml: 2, flexGrow: 1 }}>
								Initial Moves:
							</Typography>
							<Typography variant="body1" sx={{ color: 'rgb(255, 255, 255)', fontWeight: 'bold' }}>
								{originalSettings.moves}
							</Typography>
						</Box>
					</Grid>
					<Grid item xs={12}>
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								bgcolor: 'rgba(255, 255, 255, 0.05)',
								borderRadius: 1,
								p: 1,
							}}
						>
							<Flag size={20} />
							<Typography variant="body1" sx={{ color: 'rgb(200, 200, 200)', ml: 2, flexGrow: 1 }}>
								Goal:
							</Typography>
							<Typography variant="body1" sx={{ color: 'rgb(255, 255, 255)', fontWeight: 'bold' }}>
								{originalSettings.goal}
							</Typography>
						</Box>
					</Grid>
				</Grid>
			</Box>
		</>
	)
}

export default LevelCard
