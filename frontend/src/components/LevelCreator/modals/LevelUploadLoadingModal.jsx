import { Modal, Box, Typography, Grid, Button, CircularProgress } from '@mui/material'
import React, { useEffect, useState } from 'react'

function LevelUploadLoadingModal({ isOpen, setIsOpen, isLoading, levelUploadResponse }) {
	const [title, setTitle] = useState('test')
	function handleShowMyLevels() {
		console.log('navigate to their levels or something')
	}

	useEffect(() => {
		if (isLoading) {
			setTitle('Saving Level...')
		} else if (levelUploadResponse === 'Level saved successfuly') {
			setTitle('Level Saved Successfuly')
		} else {
			setTitle('Failed To Save Level')
		}
	}, [levelUploadResponse, isLoading])

	const onClose = () => {
		setIsOpen(false)
		setTitle('Saving Level...')
	}

	return (
		<Modal open={isOpen} onClose={onClose}>
			<Box
				sx={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					bgcolor: 'rgb(50, 50, 52)',
					border: '2px solid #000',
					boxShadow: 24,
					p: { xs: 2.5, sm: 3 },
					textAlign: 'center',
					width: 'min(500px, 90vw)',
					borderRadius: '1rem',
				}}
			>
				<Typography
					variant="subtitle2"
					gutterBottom
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						fontSize: 'min(2rem, calc(1rem + 2vw))',
					}}
				>
					{title}
				</Typography>
				<Typography variant="subtitle1">
					{isLoading ? (
						<CircularProgress thickness={5} size={50} color="secondary" />
					) : levelUploadResponse === 'Level saved successfuly' ? (
						'You can now play and share your level by navigating to "My Levels" tab!'
					) : (
						levelUploadResponse
					)}
				</Typography>
				{/* <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center' }}>
					<Grid item xs={12} sm={6} maxWidth="20rem">
						<Button
							onClick={handleShowMyLevels}
							variant="contained"
							color="primary"
							size="small"
							fullWidth
						>
							Check My Levels
						</Button>
					</Grid>
					<Grid item xs={12} sm={6} maxWidth="20rem">
						<Button variant="outlined" fullWidth size="small" onClick={() => setIsOpen(false)}>
							Return To Editor
						</Button>
					</Grid>
				</Grid> */}
			</Box>
		</Modal>
	)
}

export default LevelUploadLoadingModal
