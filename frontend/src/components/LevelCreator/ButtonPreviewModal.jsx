import React from 'react'
import { Modal, Box, Typography, ThemeProvider, Grid, Button } from '@mui/material'
import OperatorType from './ButtonPreviews/OperatorType'
import theme from '../../themes/theme'
import { useLevelCreator } from './LevelCreatorProvider'

function ButtonPreviewModal() {
	const { isPreviewModalOpen, setIsPreviewModalOpen, previewButtonData, newButton } = useLevelCreator()

	let modalContent = null
	switch (previewButtonData.text) {
		case 'Operator':
			modalContent = <OperatorType />
			break
	}

    function handleCancel() {
      setIsPreviewModalOpen(false)
    }

		function handleAddButton() {

      setIsPreviewModalOpen(false)
    }

	return (
		<Modal open={isPreviewModalOpen} onClose={() => setIsPreviewModalOpen(false)}>
			<Box
				sx={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					bgcolor: 'rgb(50, 50, 52)',
					border: '2px solid #000',
					boxShadow: 24,
					px: { xs: 1.5 },
					pt: { xs: 3 },
					pb: { xs: 4.5 },
					width: 'min(650px, 90vw)',
					borderRadius: '1rem',
				}}
			>
				<Typography
					variant="subtitle2"
					gutterBottom
					sx={{
						display: 'flex',
						justifyContent: 'center',
						textAlign: 'center',
						fontSize: 'min(2rem, calc(1.15rem + 2vw))',
					}}
				>
					Create your own {JSON.stringify(previewButtonData)} button:
				</Typography>
				<ThemeProvider theme={theme}>{modalContent}</ThemeProvider>
				<Grid
					item
					xs={12}
					sx={{
						display: 'flex',
						justifyContent: 'center',
						marginTop: '1.75rem',
					}}
				>
					<Button
						onClick={handleAddButton}
						variant="contained"
						color="primary"
						sx={{ marginRight: { xs: '0.75rem', sm: '1.5rem', md: '2rem' } }}
					>
						Add Button
					</Button>
					<Button onClick={handleCancel} variant="outlined">
						Cancel
					</Button>
				</Grid>
			</Box>
		</Modal>
	)
}

export default ButtonPreviewModal
