import React, { useEffect } from 'react'
import { useLevelCreator } from '../LevelCreatorProvider'

function SumType() {
	const { setNewButton } = useLevelCreator()

	useEffect(() => {
		setNewButton({ type: { color: 'result-changer', purpose: 'sum' }, text: 'Sum' })
	}, [])

	return <></>
}

export default SumType
