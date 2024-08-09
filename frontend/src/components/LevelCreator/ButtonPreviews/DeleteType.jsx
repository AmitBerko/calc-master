import React, { useEffect } from 'react'
import { useLevelCreator } from '../LevelCreatorProvider'

function DeleteType() {
	const { setNewButton } = useLevelCreator()

	useEffect(() => {
		setNewButton({ type: { color: 'result-changer', purpose: 'delete' }, text: 'Delete' })
	}, [])

	return <></>
}

export default DeleteType
