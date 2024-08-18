import React, { createContext, useContext, useState } from 'react'

const GameContext = createContext()

function GameProvider({ children }) {
	const [isTypesModalOpen, setIsTypesModalOpen] = useState(false)
	const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false)
	const [targetButtonData, setTargetButtonData] = useState({ text: null, index: null })
	const [newButton, setNewButton] = useState({})
	const [deleteButtonModal, setDeleteButtonModal] = useState({
		isOpen: false,
		buttonText: '',
		index: undefined,
	})
	const [levelData, setLevelData] = useState({
		buttons: [{}, {}, {}, {}, {}, {}, {}, {}],
		originalSettings: { result: 0, moves: 0, goal: 0 },
		currentSettings: { result: 0, moves: 0, goal: 0 },
    didPass: false,
	})
	const [isLevelBeingChecked, setIsLevelBeingChecked] = useState(false)

	return (
		<GameContext.Provider
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
				isLevelBeingChecked,
				setIsLevelBeingChecked,
			}}
		>
			{children}
		</GameContext.Provider>
	)
}

export const useGame = () => useContext(GameContext)

export default GameProvider
