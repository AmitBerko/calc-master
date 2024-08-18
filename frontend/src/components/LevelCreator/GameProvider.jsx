import React, { createContext, useContext, useState } from 'react'

const GameContext = createContext()

function GameProvider({ children }) {
	const [levelData, setLevelData] = useState({
		buttons: [{}, {}, {}, {}, {}, {}, {}, {}],
		originalSettings: { result: 0, moves: 0, goal: 0 },
		currentSettings: { result: 0, moves: 0, goal: 0 },
    didPass: false,
	})

	return (
		<GameContext.Provider
			value={{
				levelData,
				setLevelData,
			}}
		>
			{children}
		</GameContext.Provider>
	)
}

export const useGame = () => useContext(GameContext)

export default GameProvider
