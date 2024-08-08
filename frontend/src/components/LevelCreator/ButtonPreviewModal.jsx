import React, { useEffect, useState } from 'react'
import { Modal, Box, Typography, ThemeProvider, Grid, Button } from '@mui/material'
import OperatorType from './ButtonPreviews/OperatorType'
import theme from '../../themes/theme'
import { useLevelCreator } from './LevelCreatorProvider'
import InsertType from './ButtonPreviews/InsertType'
import SortType from './ButtonPreviews/SortType'
import ShiftType from './ButtonPreviews/ShiftType'
import ReverseType from './ButtonPreviews/ReverseType'
import SumType from './ButtonPreviews/SumType'
import TransformType from './ButtonPreviews/TransformType'

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

	const [errors, setErrors] = useState({})
	const fieldRenames = {
		value: 'Value',
		operator: 'Operator',
		sortMode: 'Sort mode',
		shiftDirection: 'Shift direction',
		originalValue: 'Original value',
		newValue: 'New value',
	}

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
			modalContent = <ReverseType />
			description = 'reverse button description'
			break
		case 'Sum':
			modalContent = <SumType />
			description = 'sum button description'
			break
		case 'Transform':
			modalContent = <TransformType errors={errors} />
			description = 'transform button description'
			break
	}

	function handleCancel() {
		setErrors({})
		setIsPreviewModalOpen(false)
	}

	function handleAddButton() {
		let hasErrors = false

		// Only check errors to editable buttons
		if (newButton.buttonData) {
      setErrors(prevErrors => {
        let newErrors = {...prevErrors}

        Object.keys(newButton.buttonData).map(field => {
          if (!newButton.buttonData[field]) {
            newErrors[field] = `${fieldRenames[field]} is a required field`
            hasErrors = true
          } else {
            delete newErrors[field]
          }
        })
        return newErrors
      })
		}

		if (hasErrors) return
		setCurrentButtons((prevButtons) =>
			prevButtons.map((button, index) => (index === targetButtonData.index ? newButton : button))
		)
		setIsTypesModalOpen(false)
		setIsPreviewModalOpen(false)
		setErrors({})
		setTargetButtonData({})
	}

	return (
		<Modal open={isPreviewModalOpen} onClose={handleCancel}>
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
					{JSON.stringify(errors)}
				</Grid>
			</Box>
		</Modal>
	)
}

export default ButtonPreviewModal
