import React, { useEffect } from 'react'
import { useLevelCreator } from '../LevelCreatorProvider'

function DeleteType() {
	const { setNewButton } = useLevelCreator()

	useEffect(() => {
		setNewButton((prevButton) => ({
			...prevButton,
			color: 'result-changer',
			type: 'delete',
			text: 'Delete',
		}))
	}, [])

	return <></>
}

export default DeleteType
