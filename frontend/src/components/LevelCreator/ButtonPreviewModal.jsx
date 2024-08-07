import React, { useEffect, useState } from 'react'
import { Modal, Box, Typography, ThemeProvider, Grid, Button } from '@mui/material'
import OperatorType from './ButtonPreviews/OperatorType'
import theme from '../../themes/theme'
import { useLevelCreator } from './LevelCreatorProvider'
import InsertType from './ButtonPreviews/InsertType'
import SortType from './ButtonPreviews/SortType'
import ShiftType from './ButtonPreviews/ShiftType'
import ReverseType from './ButtonPreviews/ReverseType'

function ButtonPreviewModal() {
	const {
		isPreviewModalOpen,
		setIsPreviewModalOpen,
		setIsTypesModalOpen,
		targetButtonData,
		newButton,
		setNewButton,
		setTargetButtonData,
		setCurrentButtons,
	} = useLevelCreator()

	useEffect(() => {
		setNewButton({})
	}, [])

	const [errors, setErrors] = useState([])

	let modalContent = null
	let description = null
	switch (targetButtonData.text) {
		case 'Operator':
			modalContent = <OperatorType errors={errors} />
			description = 'operator button description'
			break
		case 'Insert':
			modalContent = <InsertType errors={errors} />
			description = 'insert button description'
			break
		case 'Sort':
			modalContent = <SortType errors={errors} />
			description = 'sort button description'
			break
		case 'Shift':
			modalContent = <ShiftType errors={errors} />
			description = 'shift button description'
			break
		case 'Reverse':
			modalContent = <ReverseType errors={errors} />
			description = 'reverse button description'
			break
	}

	function handleCancel() {
		setIsPreviewModalOpen(false)
	}

	function handleAddButton() {
		if (newButton.type.color === 'operator') {
			let operatorError = ''
			let valueError = ''
			if (!newButton.buttonData.operator) {
				operatorError = 'Operator is a required field'
			}
			if (!newButton.buttonData.value) {
				valueError = 'Value is a required field'
			}
			setErrors([operatorError, valueError])
      if (operatorError || valueError) return
		}

		setCurrentButtons((prevButtons) =>
			prevButtons.map((button, index) => (index === targetButtonData.index ? newButton : button))
		)
		setIsTypesModalOpen(false)
		setIsPreviewModalOpen(false)
		setTargetButtonData({})
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
					{targetButtonData.editable
						? `Create your own ${targetButtonData.text} button:`
						: `The ${targetButtonData.text} button:`}
				</Typography>
				<ThemeProvider theme={theme}>{modalContent}</ThemeProvider>

				{/* style it later */}
				<Typography variant="body1">{description}</Typography>

				<Grid
					item
					xs={12}
					sx={{
						display: 'flex',
						justifyContent: 'center',
						marginTop: '2rem',
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
					<Button onClick={handleCancel} sx={{ width: '121.5px' }} variant="outlined">
						Cancel
					</Button>
				</Grid>
			</Box>
		</Modal>
	)
}

export default ButtonPreviewModal
