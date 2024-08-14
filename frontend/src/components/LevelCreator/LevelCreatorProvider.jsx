import React, { createContext, useContext, useState } from 'react'

const LevelCreatorContext = createContext()

function LevelCreatorProvider({ children }) {
	const [isTypesModalOpen, setIsTypesModalOpen] = useState(false)
	const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false)
	const [targetButtonData, setTargetButtonData] = useState({ text: null, index: null })
	const [newButton, setNewButton] = useState({})
  const [deleteButtonModal, setDeleteButtonModal] = useState({isOpen: false, buttonText: '', index: undefined})

	const [levelData, setLevelData] = useState({
		buttons: [{}, {}, {}, {}, {}, {}, {}, {}],
		originalSettings: { result: 0, moves: 0, goal: 0 },
		currentSettings: { result: 0, moves: 0, goal: 0 },
	})

	return (
		<LevelCreatorContext.Provider
			value={{
				isTypesModalOpen,
				setIsTypesModalOpen,
				isPreviewModalOpen,
				setIsPreviewModalOpen,
				targetButtonData,
				setTargetButtonData,
				newButton,
				setNewButton,
				levelData,
				setLevelData,
				deleteButtonModal,
				setDeleteButtonModal,
			}}
		>
			{children}
		</LevelCreatorContext.Provider>
	)
}

export const useLevelCreator = () => useContext(LevelCreatorContext)

export default LevelCreatorProvider
