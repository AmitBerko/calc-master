import React, { useEffect, useRef, useState } from 'react'
import { useLevelCreator } from './LevelCreatorProvider'

function CalculatorButton({ text, index, type, buttonData, preview = false, editable }) {
	const buttonRef = useRef(null)
	const textRef = useRef(null)
	const {
		setIsTypesModalOpen,
		setIsPreviewModalOpen,
		setTargetButtonData,
		setNewButton,
		result,
		setResult,
    moves,
		setMoves,
	} = useLevelCreator()

	let handleClick = null
	let buttonClass = null

	const handleButtonsClickAndMove = (buttonFunction) => {
		return () => {
      if (moves === 0) {
        return 
      }
			const newResult = buttonFunction()

			if (newResult !== result) {
				setMoves((prevMoves) => prevMoves - 1)
			}
		}
	}

	const setButtonSettings = () => {
		switch (type && type.color) {
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
				if (type.purpose === 'sum') {
					handleClick = handleSumButton
				} else if (type.purpose === 'transform') {
					handleClick = () => handleTransformButton(buttonData.originalValue, buttonData.newValue)
				} else if (type.purpose === 'plusMinus') {
					handleClick = handlePlusMinusButton
				} else if (type.purpose === 'inv10') {
					handleClick = handleInv10Button
				} else if (type.purpose === 'delete') {
					handleClick = handleDeleteButton
				}
				break
			case 'order-changer':
				buttonClass = 'order-changer-button'
				if (type.purpose === 'sort') {
					handleClick = () => handleSortButton(buttonData.sortMode)
				} else if (type.purpose === 'shift') {
					handleClick = () => handleShiftButton(buttonData.shiftDirection)
				} else if (type.purpose === 'reverse') {
					handleClick = handleReverseButton
				}

				break
			case 'operator':
				buttonClass = 'operator-button'
				handleClick = handleOperatorButton
				break

			default:
				buttonClass = 'empty-button'
				handleClick = handleEmptyButton
		}

		if (handleClick !== handleEmptyButton && handleClick !== handleClearButton) {
			handleClick = handleButtonsClickAndMove(handleClick)
		}
	}

	const handleEmptyButton = () => {
		setTargetButtonData((prevData) => ({ ...prevData, index }))
		setIsTypesModalOpen(true)
	}

	const handleClearButton = () => {
		console.log('clear')
	}

	const handleInsertButton = () => {
		const newResult = parseInt(result + String(buttonData.value))
		setResult(newResult)
		return newResult
	}

	const handleOperatorButton = () => {
		const { operator, value } = buttonData
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

		setResult(newResult)
		return newResult
	}

	const handleSortButton = (sortMode) => {
		const resultArray = String(result).split('')
		const newResult = parseInt(
			resultArray.sort((a, b) => (sortMode === 'Ascending' ? a - b : b - a)).join('')
		)

		setResult(newResult)
		return newResult
	}

	const handleShiftButton = (shiftDirection) => {
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

		setResult(newResult)
		return newResult
	}

	const handleReverseButton = () => {
		const newResult = parseInt(String(result).split('').reverse().join(''))
		setResult(newResult)
		return newResult
	}

	const handleSumButton = () => {
		let newResult = 0
		let tempResult = result
		while (Math.abs(tempResult) > 0) {
			newResult += tempResult % 10
			tempResult = parseInt(tempResult / 10)
		}
		newResult = Math.abs(newResult)
		setResult(newResult)
		return newResult
	}

	const handleTransformButton = (originalValue, newValue) => {
		const newResult = parseInt(String(result).replaceAll(originalValue, newValue))
		setResult(newResult)
		return newResult
	}

	const handlePlusMinusButton = () => {
		const newResult = result * -1
		setResult(newResult)
		return newResult
	}

	const handleInv10Button = () => {
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
		setResult(newResult)
		return newResult
	}

	const handleDeleteButton = () => {
		const newResult = (result - (result % 10)) / 10
		setResult(newResult)
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
			fitsHeight =
				textElement.offsetHeight <= buttonHeight * (0.45 + Math.min(0.5, letters * 0.05))

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
			setTargetButtonData((prevData) => ({ ...prevData, text, editable }))
			setNewButton({})
			setIsPreviewModalOpen(true)
		}
	}

	const handlePointerDown = () => {
		buttonRef.current.classList.add('active')
	}

	const handlePointerUp = () => {
		buttonRef.current.classList.remove('active')
		handleClick()
	}

	return (
		<>
			<button
				ref={buttonRef}
				onPointerDown={handlePointerDown}
				onPointerUp={handlePointerUp}
				onPointerOut={() => buttonRef.current.classList.remove('active')}
				className={`calculator-button ${buttonClass}`}
			>
				<span
					ref={textRef}
					style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
				>
					{text}
				</span>
			</button>
		</>
	)
}

export default CalculatorButton
