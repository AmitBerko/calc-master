import React, { useEffect, useRef } from 'react'
import { useLevelCreator } from './LevelCreatorProvider'

function CalculatorButton({ text, index, type, preview = false }) {
	const buttonRef = useRef(null)
	const textRef = useRef(null)
	const {
		setIsTypesModalOpen,
		setIsPreviewModalOpen,
		setPreviewButtonData,
		setNewButton,
		previewButtonData,
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
		console.log(previewButtonData)
		setPreviewButtonData((prevData) => ({ ...prevData, index }))
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
	}

	useEffect(() => {
		const adjustFontSize = () => {
			const button = buttonRef.current
			const textElement = textRef.current

			if (!button || !textElement) return

			const buttonWidth = button.offsetWidth
			button.style.setProperty('--calculator-button-width', `${buttonWidth}px`)
			console.log('set the button width variable')
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
		handleClick = () => {
			console.log(`clicked! the text is ${text} and index is ${index}`)
			setPreviewButtonData((prevData) => ({ ...prevData, text }))
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
