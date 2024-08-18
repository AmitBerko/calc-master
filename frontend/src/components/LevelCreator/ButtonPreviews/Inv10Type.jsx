import React, { useEffect } from 'react'
import { useLevelCreator } from '../LevelCreatorProvider'
function Inv10Type() {
	const { setNewButton } = useLevelCreator()

	useEffect(() => {
		setNewButton(prevButton => ({ ...prevButton, color: 'result-changer', type: 'inv10', text: 'Inv10' }))
	}, [])

	return <></>
}

export default Inv10Type
