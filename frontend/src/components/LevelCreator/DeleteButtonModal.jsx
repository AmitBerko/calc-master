import { Modal, Box, Typography, Grid, Button } from '@mui/material'
import React from 'react'
import { useLevelCreator } from './LevelCreatorProvider'

function DeleteButtonModal() {
	const { deleteButtonModal, setDeleteButtonModal, setLevelData } = useLevelCreator()

	function deleteButton() {
		console.log('delete')
		const indexToDelete = deleteButtonModal.index
		setLevelData((prevLevelData) => ({
			...prevLevelData,
			buttons: prevLevelData.buttons.map((button, index) => {
				return index === indexToDelete ? {} : button
			}),
		}))

		setTimeout(() => {
			setDeleteButtonModal((prev) => ({ ...prev, isOpen: false }))
		}, 65)
	}

	return (
		<Modal
			open={deleteButtonModal.isOpen}
			onClose={() => setDeleteButtonModal((prev) => ({ ...prev, isOpen: false }))}
		>
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
					Delete the {deleteButtonModal.text} button?
				</Typography>
				<Grid container spacing={2}>
					<Grid item xs={6}>
						<Button
							variant="contained"
							color="primary"
							size="small"
							fullWidth
							onClick={deleteButton}
						>
							Yes
						</Button>
					</Grid>
					<Grid item xs={6}>
						<Button
							variant="outlined"
							fullWidth
							size="small"
							onClick={() => setDeleteButtonModal((prev) => ({ ...prev, isOpen: false }))}
						>
							No
						</Button>
					</Grid>
				</Grid>
			</Box>
		</Modal>
	)
}

export default DeleteButtonModal
