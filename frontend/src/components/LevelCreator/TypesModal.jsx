import {
	Button,
	Modal,
	Box,
	Typography,
	Grid,
	createTheme,
	responsiveFontSizes,
} from '@mui/material'
import React, { useState } from 'react'
import CalculatorButton from './CalculatorButton'
import { ThemeProvider } from '@emotion/react'
import TypesChildModal from './TypesChildModal'

function TypesModal({ isOpen, handleClose }) {
	const [isChildOpen, setIsChildOpen] = useState(false)
	const [selectedType, setSelectedType] = useState(null)

	const handleChildOpen = (type) => {
    console.log('child opened and type is', type)
		setSelectedType(type)
		setIsChildOpen(true)
	}
	const handleChildClose = () => {
		setIsChildOpen(false)
	}

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
		{ text: 'Operator', type: 'operator' },
		{ text: 'Insert', type: 'insert' },
		{ text: 'Sort', type: 'order-changer' },
		{ text: 'Shift', type: 'order-changer' },
		{ text: 'Reverse', type: 'order-changer' },
		{ text: 'Sum', type: 'result-changer' },
		{ text: 'Transform', type: 'result-changer' },
		{ text: '+/-', type: 'result-changer' },
		{ text: 'Inv10', type: 'result-changer' },
		{ text: 'Delete', type: 'result-changer' },
	]

	return (
		<ThemeProvider theme={typesModalTheme}>
			<Modal
				open={isOpen}
				onClose={handleClose}
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
										text={buttonPreview.text}
										handleChildOpen={handleChildOpen}
										preview={true}
										type={buttonPreview.type}
									/>
								</Grid>
							)
						})}
					</Grid>
				</Box>
			</Modal>
			<TypesChildModal
				isChildOpen={isChildOpen}
				handleChildClose={handleChildClose}
				selectedType={selectedType}
			/>
		</ThemeProvider>
	)
}

export default TypesModal
