import React, { useEffect, useRef } from 'react'
import { useLevelCreator } from './LevelCreatorProvider'
import { IconButton } from '@mui/material'
import CancelRoundedIcon from '@mui/icons-material/CancelRounded'

function CalculatorButton({
	text,
	index,
	type,
  color,
	buttonData,
	preview = false,
	editable,
	isLevelCreator,
	levelData,
	setLevelData,
}) {
	const buttonRef = useRef(null)
	const textRef = useRef(null)
	const {
		setIsTypesModalOpen,
		setIsEditorModalOpen,
		setNewButton,
		setDeleteButtonModal,
	} = useLevelCreator()

	let handleClick = null
	let buttonClass = null

	const handleButtonsClickAndMove = (buttonFunction) => {
		if (preview || !buttonFunction) return
		const result = levelData.currentSettings.result
		return () => {
			if (levelData.currentSettings.moves === 0) {
				return
			}

			const newResult = buttonFunction()
			setLevelData((prevLevelData) => ({
				...prevLevelData,
				currentSettings: { ...prevLevelData.currentSettings, result: newResult },
			}))

			if (newResult !== result) {
				setLevelData((prevLevelData) => ({
					...prevLevelData,
					currentSettings: {
						...prevLevelData.currentSettings,
						moves: prevLevelData.currentSettings.moves - 1,
					},
				}))
			}
		}
	}

	const setButtonSettings = () => {
		switch (color) {
			case 'clear':
				buttonClass = 'clear-button'
				handleClick = handleClearButton
				break
			case 'insert':
				buttonClass = 'insert-button'
				handleClick = handleInsertButton
				break
			case 'result-changer':
				buttonClass = 'result-changer-button'
				if (type === 'sum') {
					handleClick = handleSumButton
				} else if (type === 'transform') {
					handleClick = () => handleTransformButton(buttonData.originalValue, buttonData.newValue)
				} else if (type === 'plusMinus') {
					handleClick = handlePlusMinusButton
				} else if (type === 'inv10') {
					handleClick = handleInv10Button
				} else if (type === 'delete') {
					handleClick = handleDeleteButton
				}
				break
			case 'order-changer':
				buttonClass = 'order-changer-button'
				if (type === 'sort') {
					handleClick = () => handleSortButton(buttonData.sortMode)
				} else if (type === 'shift') {
					handleClick = () => handleShiftButton(buttonData.shiftDirection)
				} else if (type === 'reverse') {
					handleClick = handleReverseButton
				}

				break
			case 'operator':
				buttonClass = 'operator-button'
				handleClick = handleOperatorButton
				break

			default:
				buttonClass = `empty-button ${isLevelCreator ? '' : 'ignore-empty-button'}`
				handleClick = isLevelCreator && handleEmptyButton
		}

		if (handleClick !== handleEmptyButton && handleClick !== handleClearButton) {
			handleClick = handleButtonsClickAndMove(handleClick)
		}
	}

	const handleEmptyButton = () => {
		setNewButton((prevData) => ({ ...prevData, index }))
		setIsTypesModalOpen(true)
	}

	const handleClearButton = () => {
		setLevelData((prevLevelData) => ({
			...prevLevelData,
			currentSettings: prevLevelData.originalSettings,
			didPass: false,
		}))
	}

	const handleInsertButton = () => {
		const result = levelData.currentSettings.result
		const newResult = parseInt(result + String(buttonData.value))
		return newResult
	}

	const handleOperatorButton = () => {
		const { operator, value } = buttonData
		const result = levelData.currentSettings.result
		let newResult
		switch (operator) {
			case '+':
				newResult = result + value
				break
			case '-':
				newResult = result - value
				break
			case 'x':
				newResult = result * value
				break
			case '/':
				newResult = result / value
				break
		}

		return newResult
	}

	const handleSortButton = (sortMode) => {
		const result = levelData.currentSettings.result
		const resultArray = String(result).split('')
		const newResult = parseInt(
			resultArray.sort((a, b) => (sortMode === 'Ascending' ? a - b : b - a)).join('')
		)

		return newResult
	}

	const handleShiftButton = (shiftDirection) => {
		const result = levelData.currentSettings.result
		let newResult
		const isNegative = result < 0
		const stringResult = String(Math.abs(result))
		if (shiftDirection === 'Left') {
			newResult = (isNegative ? -1 : 1) * parseInt(stringResult.slice(1) + stringResult[0])
		} else {
			newResult =
				(isNegative ? -1 : 1) *
				parseInt(stringResult[stringResult.length - 1] + stringResult.slice(0, -1))
		}

		return newResult
	}

	const handleReverseButton = () => {
		const result = levelData.currentSettings.result
		const newResult = parseInt(String(result).split('').reverse().join(''))
		return newResult
	}

	const handleSumButton = () => {
		const result = levelData.currentSettings.result
		let newResult = 0
		let tempResult = result
		while (Math.abs(tempResult) > 0) {
			newResult += tempResult % 10
			tempResult = parseInt(tempResult / 10)
		}
		newResult = Math.abs(newResult)
		return newResult
	}

	const handleTransformButton = (originalValue, newValue) => {
		const result = levelData.currentSettings.result
		const newResult = parseInt(String(result).replaceAll(originalValue, newValue))
		return newResult
	}

	const handlePlusMinusButton = () => {
		const result = levelData.currentSettings.result
		const newResult = result * -1
		return newResult
	}

	const handleInv10Button = () => {
		const result = levelData.currentSettings.result
		const isNegative = result < 0

		const resultStr = String(Math.abs(result))
		const invertedResult = resultStr
			.split('')
			.map((digit) => {
				if (digit === '0') return 0
				return String(10 - parseInt(digit))
			})
			.join('')

		const newResult = parseInt(invertedResult) * (isNegative ? -1 : 1)
		return newResult
	}

	const handleDeleteButton = () => {
		const result = levelData.currentSettings.result
		const newResult = (result - (result % 10)) / 10
		return newResult
	}

	function adjustFontSize() {
		const button = buttonRef.current
		const textElement = textRef.current
		const transformIcon = textRef.current.querySelector('.transform-arrow')

		if (!button || !textElement) return

		const letters = button.textContent.length
		const buttonWidth = button.offsetWidth
		const buttonHeight = button.offsetHeight
		document.documentElement.style.setProperty('--calculator-button-width', `${buttonWidth}px`)

		let minFontSize = 1
		let maxFontSize = 30 // Start with a large font size
		let midFontSize
		let fitsWidth
		let fitsHeight

		while (minFontSize <= maxFontSize) {
			midFontSize = Math.floor((minFontSize + maxFontSize) / 2)
			textElement.style.fontSize = `${midFontSize}px`
			if (transformIcon) {
				transformIcon.style.fontSize = `${midFontSize}px`
			}
			// Check how good the mid font size is
			fitsWidth = textElement.offsetWidth <= buttonWidth * (0.45 + Math.min(0.5, letters * 0.05))
			fitsHeight = textElement.offsetHeight <= buttonHeight * (0.45 + Math.min(0.5, letters * 0.05))

			if (fitsHeight && fitsWidth) {
				// If it fits, try a bigger fontsize for the case it's too small
				minFontSize = midFontSize + 1
			} else {
				// If it doesn't fit, try a smaller font size
				maxFontSize = midFontSize - 1
			}
		}

		textElement.style.fontSize = `${midFontSize}px`
	}

	function debounce(cb, delay) {
		let timeout
		return (...args) => {
			if (timeout) clearTimeout(timeout)
			timeout = setTimeout(() => {
				cb(...args)
			}, delay)
		}
	}

	const debouncedAdjustFontSize = debounce(adjustFontSize, 125)

	useEffect(() => {
		adjustFontSize()
		window.addEventListener('resize', debouncedAdjustFontSize)

		return () => {
			window.removeEventListener('resize', debouncedAdjustFontSize)
		}
	}, [text]) // Re-run effect if text changes

	setButtonSettings()

	if (preview) {
		handleClick = () => {
			setNewButton((prev) => ({...prev, typeText: text, type, editable }))
			setIsEditorModalOpen(true)
		}
	}

	if (!preview && levelData.didPass && type !== 'clear') {
		handleClick = () => {}
	}

	const handlePointerDown = () => {
		buttonRef.current.classList.add('active')
	}

	const handlePointerUp = () => {
		buttonRef.current.classList.remove('active')
		handleClick && handleClick()
	}

	const handleButtonRemove = () => {
		setDeleteButtonModal({ isOpen: true, index, text })
	}

	return (
		<>
			<button
				ref={buttonRef}
				onPointerDown={(e) => {
					if (!e.target.closest('.button-remover')) {
						handlePointerDown()
					}
				}}
				onPointerUp={(e) => {
					if (!e.target.closest('.button-remover')) {
						handlePointerUp()
					}
				}}
				onPointerOut={() => {
					buttonRef.current.classList.remove('active')
				}}
				className={`calculator-button ${buttonClass}`}
			>
				<span
					ref={textRef}
					style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
				>
					{text}
				</span>

				{/* Show it if it's levelcreator and a non-empty button */}
				{isLevelCreator && type && (
					<IconButton component="div" className="button-remover" onClick={handleButtonRemove}>
						<CancelRoundedIcon />
					</IconButton>
				)}
			</button>
		</>
	)
}

export default CalculatorButton
