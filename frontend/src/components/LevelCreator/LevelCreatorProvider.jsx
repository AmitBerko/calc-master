import React, { createContext, useContext, useState } from 'react'

const LevelCreatorContext = createContext()

function LevelCreatorProvider({ children }) {
	const [levelCreatorData, setLevelCreatorData] = useState({
		buttons: [{}, {}, {}, {}, {}, {}, {}, {}],
		originalSettings: { result: 0, moves: 0, goal: 0 },
		currentSettings: { result: 0, moves: 0 },
		didPass: false,
	})

  const [isLevelBeingChecked, setIsLevelBeingChecked] = useState(false)

	const [deleteButtonModal, setDeleteButtonModal] = useState({
		isOpen: false,
		buttonText: '',
		index: undefined,
	})

	const [newButton, setNewButton] = useState({
		index: undefined,
		text: '',
		color: '',
		type: '',
    typeText: '',
		buttonData: {},
	})

  const [isTypesModalOpen, setIsTypesModalOpen] = useState(false)
  const [isEditorModalOpen, setIsEditorModalOpen] = useState(false)

	return (
		<LevelCreatorContext.Provider
			value={{
				levelCreatorData,
				setLevelCreatorData,
				deleteButtonModal,
				setDeleteButtonModal,
				newButton,
				setNewButton,
				isLevelBeingChecked,
				setIsLevelBeingChecked,
				isTypesModalOpen,
				setIsTypesModalOpen,
				isEditorModalOpen,
				setIsEditorModalOpen,
			}}
		>
			{children}
		</LevelCreatorContext.Provider>
	)
}

export const useLevelCreator = () => useContext(LevelCreatorContext)

export default LevelCreatorProvider
