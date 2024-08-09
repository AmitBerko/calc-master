import React, {useEffect} from 'react'
import { useLevelCreator } from '../LevelCreatorProvider'

function PlusMinusType() {
	const { setNewButton } = useLevelCreator()

	useEffect(() => {
		setNewButton({ type: { color: 'result-changer', purpose: 'plusMinus' }, text: '+/-' })
	}, [])

	return <></>
}

export default PlusMinusType