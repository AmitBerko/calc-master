// LevelCreatorProvider.jsx
import React, { createContext, useContext, useState } from 'react'

const LevelCreatorContext = createContext()

function LevelCreatorProvider({ children }) {
	const [isTypesModalOpen, setIsTypesModalOpen] = useState(false)
	const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false)
	const [previewButtonData, setPreviewButtonData] = useState({ text: null, index: null })
	const [currentButtons, setCurrentButtons] = useState([
		{ type: '', text: '' },
		{ type: '', text: '' },
		{ type: '', text: '' },
		{ type: '', text: '' },
		{ type: '', text: '' },
		{ type: '', text: '' },
		{ type: '', text: '' },
		{ type: '', text: '' },
	])
	const [newButton, setNewButton] = useState({})

	return (
		<LevelCreatorContext.Provider
			value={{
				isTypesModalOpen,
				setIsTypesModalOpen,
				isPreviewModalOpen,
				setIsPreviewModalOpen,
				previewButtonData,
				setPreviewButtonData,
				currentButtons,
				setCurrentButtons,
				newButton,
				setNewButton,
			}}
		>
			{children}
		</LevelCreatorContext.Provider>
	)
}

export const useLevelCreator = () => useContext(LevelCreatorContext)

export default LevelCreatorProvider
