// LevelCreatorProvider.jsx
import React, { createContext, useContext, useState } from 'react'

const LevelCreatorContext = createContext()

function LevelCreatorProvider({ children }) {
	const [isTypesModalOpen, setIsTypesModalOpen] = useState(false)
	const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false)
	const [targetButtonData, setTargetButtonData] = useState({ text: null, index: null })
	const [currentButtons, setCurrentButtons] = useState([{}, {}, {}, {}, {}, {}, {}, {}])
	const [newButton, setNewButton] = useState({})
  const [result, setResult] = useState(0)

	return (
		<LevelCreatorContext.Provider
			value={{
				isTypesModalOpen,
				setIsTypesModalOpen,
				isPreviewModalOpen,
				setIsPreviewModalOpen,
				targetButtonData,
				setTargetButtonData,
				currentButtons,
				setCurrentButtons,
				newButton,
				setNewButton,
        result,
        setResult
			}}
		>
			{children}
		</LevelCreatorContext.Provider>
	)
}

export const useLevelCreator = () => useContext(LevelCreatorContext)

export default LevelCreatorProvider
