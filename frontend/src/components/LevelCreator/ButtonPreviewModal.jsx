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
		// setCurrentButtons,
		setLevelData,
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
			description = 'Performs basic math operations on the current result.'
			example = 'If the result is 3 and you press +4, the new result will be 7.'
			break
		case 'Insert':
			modalContent = <InsertType errors={errors} />
			description = 'Adds a number to the end of the current result.'
			example = 'If the result is 123 and you insert 5, the new result will be 1235.'
			break
		case 'Sort':
			modalContent = <SortType errors={errors} />
			description = 'Orders the digits in ascending or descending order.'
			example = 'If the result is 4213 and you sort ascending, it becomes 1234.'
			break
		case 'Shift':
			modalContent = <ShiftType errors={errors} />
			description = 'Moves all digits left or right by one position.'
			example = 'If the result is 1234 and you shift left, it becomes 2341.'
			break
		case 'Reverse':
			modalContent = <ReverseType />
			description = 'Reverses the order of all digits.'
			example = 'If the result is 1234, it becomes 4321.'
			break
		case 'Sum':
			modalContent = <SumType />
			description = 'Adds up all the digits in the current result.'
			example = 'If the result is 1234, the sum will be 10 (1+2+3+4).'
			break
		case 'Transform':
			modalContent = <TransformType errors={errors} />
			description = 'Replaces all instances of a specific value with a different value.'
			example = 'If the result is 1232 and you transform 2 to 5, it becomes 1535.'
			break
		case '+/-':
			modalContent = <PlusMinusType />
			description = 'Changes the sign of the current result.'
			example = 'If the result is 5, it becomes -5, and vice versa.'
			break
		case 'Inv10':
			modalContent = <Inv10Type />
			description = 'Inverts each digit (subtracts it from 10).'
			example = 'If the result is 7890, it becomes 3210.'
			break
		case 'Delete':
			modalContent = <DeleteType />
			description = 'Removes the last digit from the current result.'
			example = 'If the result is 1234, it becomes 123.'
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
						if (
							!(
								newButton.type.purpose === 'operator' &&
								['/', 'x'].includes(newButton.buttonData.operator)
							)
						) {
							newErrors[field] = `${fieldRenames[field]} has to be a positive number`
							hasErrors = true
						}
					} else {
						delete newErrors[field]
					}
				})

				return newErrors
			})
		}

		if (hasErrors) return
		setLevelData((prevLevelData) => ({
			...prevLevelData,
			buttons: prevLevelData.buttons.map((button, index) =>
				index === targetButtonData.index ? newButton : button
			),
		}))
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
