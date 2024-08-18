import { Modal, Box, Typography, Grid, Button } from '@mui/material'
import React from 'react'
import { useLevelCreator } from '../LevelCreatorProvider'

function UploadLevelConfirmModal({ isUploadLevelConfirmOpen, setIsUploadLevelConfirmOpen }) {
	const { setIsLevelBeingChecked, setLevelData } = useLevelCreator()

	function handleTryLevel() {
		setLevelData((prevLevelData) => ({
			...prevLevelData,
			currentSettings: prevLevelData.originalSettings,
			didPass: false,
		}))
		setIsLevelBeingChecked(true)
		setIsUploadLevelConfirmOpen(false)
	}

	return (
		<Modal open={isUploadLevelConfirmOpen} onClose={() => setIsUploadLevelConfirmOpen(false)}>
			<Box
				sx={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					bgcolor: 'rgb(50, 50, 52)',
					border: '2px solid #000',
					boxShadow: 24,
					p: { xs: 2.5, sm: 3.5 },
					pt: { xs: 1.65, sm: 2.5 },
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
					Upload Level
				</Typography>
				<Typography sx={{ mb: '1.25rem' }} variant="subtitle1">
					To ensure your level is beatable, you need to complete it before uploading. Your level
					will be saved automatically once you succeed it.
				</Typography>
				<Grid container spacing={2}>
					<Grid item xs={6}>
						<Button
							onClick={handleTryLevel}
							variant="contained"
							color="primary"
							size="small"
							fullWidth
						>
							Beat My Level
						</Button>
					</Grid>
					<Grid item xs={6}>
						<Button
							variant="outlined"
							fullWidth
							size="small"
							onClick={() => setIsUploadLevelConfirmOpen(false)}
						>
							Keep Editing
						</Button>
					</Grid>
				</Grid>
			</Box>
		</Modal>
	)
}

export default UploadLevelConfirmModal
