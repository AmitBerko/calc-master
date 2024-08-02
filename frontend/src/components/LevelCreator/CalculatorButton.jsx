import React, { useEffect, useRef, useState } from 'react'

function CalculatorButton({ text, type, index, handleOpen, handleChildOpen, preview = false }) {
	const buttonRef = useRef(null)
	const textRef = useRef(null)

	let handleClick = null
	let buttonClass = null

	const setButtonSettings = () => {
		switch (type) {
			case 'clear':
				if (!preview) handleClick = handleClearButton
				buttonClass = 'clear-button'
				break
			case 'insert':
				if (!preview) handleClick = handleInsertButton
				buttonClass = 'insert-button'
				break
			case 'result-changer':
				if (!preview) handleClick = handleModifierButton
				buttonClass = 'result-changer-button'
				break
			case 'order-changer':
				buttonClass = 'order-changer-button'
				break
			case 'operator':
				if (!preview) handleClick = handleOperatorButton
				buttonClass = 'operator-button'
				break

			default:
				if (!preview) handleClick = handleEmptyButton
				buttonClass = 'empty-button'
		}
	}

	const handleEmptyButton = () => {
    handleOpen()
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
	}

	useEffect(() => {
		const adjustFontSize = () => {
			const button = buttonRef.current
			const textElement = textRef.current

			if (!button || !textElement) return

			const buttonWidth = button.offsetWidth
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

		adjustFontSize()
		window.addEventListener('resize', adjustFontSize)

		return () => {
			window.removeEventListener('resize', adjustFontSize)
		}
	}, [text]) // Re-run effect if text changes

	setButtonSettings()

  if (preview) {
    handleClick = () => handleChildOpen(`${text} and ${type}`)
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
