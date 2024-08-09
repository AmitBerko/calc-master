import React, { useEffect, useRef } from 'react'
import { useLevelCreator } from './LevelCreatorProvider'

function CalculatorButton({ text, index, type, buttonData, preview = false, editable }) {
	const buttonRef = useRef(null)
	const textRef = useRef(null)
	const {
		setIsTypesModalOpen,
		setIsPreviewModalOpen,
		setTargetButtonData,
		setNewButton,
		setResult,
	} = useLevelCreator()

	let handleClick = null
	let buttonClass = null

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
	}

	const handleEmptyButton = () => {
		setTargetButtonData((prevData) => ({ ...prevData, index }))
		setIsTypesModalOpen(true)
	}

	const handleClearButton = () => {
		console.log('clear')
	}

	const handleInsertButton = () => {
		setResult((result) => parseInt(result + String(buttonData.value)))
	}

	const handleOperatorButton = () => {
		const { operator, value } = buttonData
		switch (operator) {
			case '+':
				setResult((result) => result + value)
				break
			case '-':
				setResult((result) => result - value)
				break
			case 'x':
				setResult((result) => result * value)
				break
			case '/':
				setResult((result) => result / value)
				break
		}
		console.log(`the button data is`, value)
	}

	const handleSortButton = (sortMode) => {
		setResult((result) => {
			const resultArray = String(result).split('')

			return parseInt(
				resultArray.sort((a, b) => (sortMode === 'Ascending' ? a - b : b - a)).join('')
			)
		})
	}

	const handleShiftButton = (shiftDirection) => {
		setResult((result) => {
			const stringResult = String(result)
			if (shiftDirection === 'Left') {
				return parseInt(stringResult.slice(1) + stringResult[0])
			} else {
				return parseInt(stringResult[stringResult.length - 1] + stringResult.slice(0, -1))
			}
		})
	}

	const handleReverseButton = () => {
		setResult((result) => {
			return parseInt(String(result).split('').reverse().join(''))
		})
	}

	const handleSumButton = () => {
		setResult((result) => {
			let newResult = 0
			while (result > 0) {
				newResult += result % 10
				result = parseInt(result / 10)
			}

			return newResult
		})
	}

	const handleTransformButton = (originalValue, newValue) => {
		setResult((result) => {
			return parseInt(String(result).replaceAll(originalValue, newValue))
		})
	}

	const handlePlusMinusButton = () => {
		setResult((result) => result * -1)
	}

	const handleInv10Button = () => {
		setResult((result) => {
			return parseInt(
				String(result)
					.split('')
					.map((digit) => {
						if (parseInt(digit) === 0) return 0
						return 10 - parseInt(digit)
					})
					.join('')
			)
		})
	}

	const handleDeleteButton = () => {
		setResult((result) => {
			return (result - (result % 10)) / 10
		})
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
			fitsWidth = textElement.offsetWidth <= buttonWidth * (0.375 + Math.min(0.5, letters * 0.065))
			fitsHeight =
				textElement.offsetHeight <= buttonHeight * (0.375 + Math.min(0.5, letters * 0.065))

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
