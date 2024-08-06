import React, { useEffect, useRef } from 'react'
import { useLevelCreator } from './LevelCreatorProvider'

function CalculatorButton({ text, index, type, buttonData, preview = false }) {
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
		switch (type) {
			case 'clear':
				handleClick = handleClearButton
				buttonClass = 'clear-button'
				break
			case 'insert':
				handleClick = handleInsertButton
				buttonClass = 'insert-button'
				break
			case 'result-changer':
				handleClick = handleModifierButton
				buttonClass = 'result-changer-button'
				break
			case 'order-changer':
				buttonClass = 'order-changer-button'
				break
			case 'operator':
				handleClick = handleOperatorButton
				buttonClass = 'operator-button'
				break

			default:
				handleClick = handleEmptyButton
				buttonClass = 'empty-button'
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
		console.log('insert')
	}

	const handleModifierButton = () => {
		console.log('modifier')
	}

	const handleOperatorButton = () => {
		console.log('operator')
		const { operator, value } = buttonData
		switch (operator) {
			case '+':
				setResult((result) => result + value)
				break
			case '-':
				setResult((result) => result - value)
				break
			case '*':
				setResult((result) => result * value)
				break
			case '/':
				setResult((result) => result / value)
				break
		}
		console.log(`the button data is`, value)
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
			setTargetButtonData((prevData) => ({ ...prevData, text }))
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
