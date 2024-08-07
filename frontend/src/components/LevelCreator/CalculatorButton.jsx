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
				handleClick = handleModifierButton
				break
			case 'order-changer':
				buttonClass = 'order-changer-button'
				if (type.purpose === 'sort') {
					handleClick = () => handleSortButton(buttonData.sortMode)
				} else if (type.purpose === 'shift') {
					handleClick = () => handleShiftButton(buttonData.shiftDirection)
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

	const handleModifierButton = () => {
		console.log('modifier')
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

	function adjustFontSize() {
		const button = buttonRef.current
		const textElement = textRef.current

		if (!button || !textElement) return

		const buttonWidth = button.offsetWidth
		document.documentElement.style.setProperty('--calculator-button-width', `${buttonWidth}px`)
		const buttonHeight = button.offsetHeight

		let fontSize = 35 // Start with a large font size
		const letters = button.textContent.length
		textElement.style.fontSize = `${fontSize}px`

		// Reduce font size until text fits the button's height & width
		while (
			textElement.offsetWidth > buttonWidth * (0.5 + Math.min(0.3, letters * 0.1)) ||
			(textElement.offsetHeight > buttonHeight * (0.5 + Math.min(0.3, letters * 0.1)) &&
				fontSize > 1)
		) {
			fontSize--
			textElement.style.fontSize = `${fontSize}px`
		}
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

	return (
		<>
			<button ref={buttonRef} onClick={handleClick} className={`calculator-button ${buttonClass}`}>
				<span ref={textRef} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
					{text}
				</span>
			</button>
		</>
	)
}

export default CalculatorButton
