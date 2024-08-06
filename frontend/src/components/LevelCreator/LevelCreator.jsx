import React from 'react'
import TypesModal from './TypesModal'
import { useLevelCreator } from './LevelCreatorProvider'
import Calculator from './Calculator'

function LevelCreator() {
	const { currentButtons, result } = useLevelCreator()

	return (
		<>
			<Calculator currentButtons={currentButtons} result={result} />
			<TypesModal />
		</>
	)
}

export default LevelCreator
