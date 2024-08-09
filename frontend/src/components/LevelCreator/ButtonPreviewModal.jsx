import React, { useEffect, useState } from 'react'
import {
	Modal,
	Box,
	Typography,
	ThemeProvider,
	Grid,
	Button,
	Divider,
	Paper,
	autocompleteClasses,
} from '@mui/material'
import OperatorType from './ButtonPreviews/OperatorType'
import theme from '../../themes/theme'
import { useLevelCreator } from './LevelCreatorProvider'
import InsertType from './ButtonPreviews/InsertType'
import SortType from './ButtonPreviews/SortType'
import ShiftType from './ButtonPreviews/ShiftType'
import ReverseType from './ButtonPreviews/ReverseType'
import SumType from './ButtonPreviews/SumType'
import TransformType from './ButtonPreviews/TransformType'
import PlusMinusType from './ButtonPreviews/PlusMinusType'
import Inv10Type from './ButtonPreviews/Inv10Type'
import DeleteType from './ButtonPreviews/DeleteType'
import ButtonDescription from './ButtonDescription'

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
	let example = null
	switch (targetButtonData.text) {
		case 'Operator':
			modalContent = <OperatorType errors={errors} />
			description = `Performs basic math operations on the current result. It takes an operator (+, -, *, /) and a value, and applies the operation to the result.`
			example = 'If the current result is 3 and you press on a +4, the result will be updated to 7.'
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
		case '+/-':
			modalContent = <PlusMinusType />
			description = '+/- button description'
			break
		case 'Inv10':
			modalContent = <Inv10Type />
			description = 'inv10 button description'
			break
		case 'Delete':
			modalContent = <DeleteType />
			description = 'delete button description'
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
			setErrors((prevErrors) => {
				let newErrors = { ...prevErrors }

				Object.keys(newButton.buttonData).map((field) => {
					if (!newButton.buttonData[field]) {
						if (!(newButton.type.purpose === 'insert' && newButton.buttonData[field] === 0)) {
							newErrors[field] = `${fieldRenames[field]} is a required field`
							hasErrors = true
						}
					} else if (newButton.buttonData[field] <= 0) {
						newErrors[field] = `${fieldRenames[field]} has to be a positive number`
						hasErrors = true
					} else {
						delete newErrors[field] // Ensure the error is removed when the field is valid
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
				<ButtonDescription description={description} example={example} />
				<Grid
					item
					xs={12}
					sx={{
						display: 'flex',
						justifyContent: 'center',
						marginTop: '1.5rem',
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
