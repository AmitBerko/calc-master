import React, { useEffect } from 'react'
import { useLevelCreator } from '../LevelCreatorProvider'

function SumType() {
	const { setNewButton } = useLevelCreator()

	useEffect(() => {
		setNewButton((prevButton) => ({
			...prevButton,
			color: 'result-changer',
			type: 'sum',
			text: 'Sum',
		}))
	}, [])

	return <></>
}

export default SumType
