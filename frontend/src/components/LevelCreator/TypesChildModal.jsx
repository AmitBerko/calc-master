import React from 'react'
import { Modal, Box, Typography } from '@mui/material'

function TypesChildModal({ isChildOpen, handleChildClose, selectedType }) {
	return (
		<Modal
			open={isChildOpen}
			onClose={handleChildClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
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
					px: { xs: 1.5 },
					pt: { xs: 3 },
					pb: { xs: 4.5 },
					width: 'min(650px, 90vw)',
					borderRadius: '1rem',
				}}
			>
				<Typography
					variant="h3"
					gutterBottom
					sx={{
						display: 'flex',
						justifyContent: 'center',
						textAlign: 'center',
						fontSize: 'min(3rem, calc(1rem + 3.5vw))',
					}}
				>
					{selectedType}
				</Typography>
			</Box>
		</Modal>
	)
}

export default TypesChildModal
