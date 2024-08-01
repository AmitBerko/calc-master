import React, { useEffect, useRef } from 'react'

function CalculatorButton({ text, type, index }) {
	const buttonRef = useRef(null)
	const textRef = useRef(null)

	const getButtonClass = () => {
		if (index === 8) {
			return 'clear-button'
		}
		switch (type) {
			default:
				return 'empty-button'
		}
	}

	useEffect(() => {
		const adjustFontSize = () => {
			const button = buttonRef.current
			const textElement = textRef.current

			if (!button || !textElement) return

			const buttonWidth = button.offsetWidth
			const buttonHeight = button.offsetHeight

			let fontSize = 40 // Start with a large font size
			const letters = button.textContent.length
			textElement.style.fontSize = `${fontSize}px`

			// Reduce font size until text fits within button
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

	return (
		<button ref={buttonRef} className={`calculator-button ${getButtonClass()}`}>
			<span ref={textRef} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
        {text}
			</span>
		</button>
	)
}

export default CalculatorButton
