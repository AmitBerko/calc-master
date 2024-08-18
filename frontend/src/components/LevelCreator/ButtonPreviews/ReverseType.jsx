import React, { useEffect } from 'react'
import { useLevelCreator } from '../LevelCreatorProvider'

function ReverseType() {
	const { setNewButton } = useLevelCreator()

	useEffect(() => {
		setNewButton((prevButton) => ({
			...prevButton,
			color: 'order-changer',
			type: 'reverse',
			text: 'Reverse',
		}))
	}, [])

	return <></>
}

export default ReverseType
