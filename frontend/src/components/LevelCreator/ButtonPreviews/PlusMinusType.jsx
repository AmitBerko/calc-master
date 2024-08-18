import React, { useEffect } from 'react'
import { useLevelCreator } from '../LevelCreatorProvider'

function PlusMinusType() {
	const { setNewButton } = useLevelCreator()

	useEffect(() => {
		setNewButton((prevButton) => ({
			...prevButton,
			color: 'result-changer',
			type: 'plusMinus',
			text: '+/-',
		}))
	}, [])

	return <></>
}

export default PlusMinusType
