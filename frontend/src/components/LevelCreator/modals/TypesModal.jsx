import { Modal, Box, Typography, Grid, createTheme } from '@mui/material'
import React from 'react'
import CalculatorButton from '../CalculatorButton'
import { ThemeProvider } from '@emotion/react'
import ButtonPreviewModal from './ButtonPreviewModal'
import { useLevelCreator } from '../LevelCreatorProvider'

function TypesModal() {
	const { isTypesModalOpen, setIsTypesModalOpen } = useLevelCreator()

	let typesModalTheme = createTheme({
		breakpoints: {
			values: {
				xs: 0,
				sm: 325,
				md: 500,
			},
		},
	})

	const typesPreview = [
		{ text: 'Operator', type: { color: 'operator' }, editable: true },
		{ text: 'Insert', type: { color: 'insert' }, editable: true },
		{ text: 'Sort', type: { color: 'order-changer' }, editable: true },
		{ text: 'Shift', type: { color: 'order-changer' }, editable: true },
		{ text: 'Reverse', type: { color: 'order-changer' }, editable: false },
		{ text: 'Sum', type: { color: 'result-changer' }, editable: false },
		{ text: 'Transform', type: { color: 'result-changer' }, editable: true },
		{ text: '+/-', type: { color: 'result-changer' }, editable: false },
		{ text: 'Inv10', type: { color: 'result-changer' }, editable: false },
		{ text: 'Delete', type: { color: 'result-changer' }, editable: false },
	]

	return (
		<ThemeProvider theme={typesModalTheme}>
			<Modal
        keepMounted
				open={isTypesModalOpen}
				onClose={() => setIsTypesModalOpen(false)}
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
						pt: { xs: 2.75 },
						pb: { xs: 5 },
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
							fontSize: 'min(3rem, calc(1rem + 3.5vw))',
						}}
					>
						Choose A Button Type
					</Typography>
					<Grid
						container
						columnSpacing={{ xs: 1, sm: 0.75 }}
						rowSpacing={{ xs: 3, md: 4 }}
						sx={{ display: 'flex', justifyContent: 'center' }}
					>
						{typesPreview.map((buttonPreview, index) => {
							return (
								<Grid
									key={index}
									item
									xs={6}
									sm={4}
									md={3}
									sx={{ display: 'flex', justifyContent: 'center' }}
								>
									<CalculatorButton
										type={buttonPreview.type}
										text={buttonPreview.text}
										preview={true}
										editable={buttonPreview.editable}
									/>
								</Grid>
							)
						})}
					</Grid>
				</Box>
			</Modal>
			<ButtonPreviewModal />
		</ThemeProvider>
	)
}

export default TypesModal
