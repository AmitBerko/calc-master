import React from 'react'
import TypesModal from './TypesModal'
import { useLevelCreator } from './LevelCreatorProvider'
import Calculator from './Calculator'

function LevelCreator() {
	const { currentButtons, result } = useLevelCreator()

	return (
		<>
			<Calculator currentButtons={currentButtons} result={result} />
			<div style={{ position: 'absolute' }}>{JSON.stringify(currentButtons)}</div>
			<TypesModal />
		</>
	)
}

export default LevelCreator
