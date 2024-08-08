import React, { useEffect } from 'react'
import { useLevelCreator } from '../LevelCreatorProvider'

function ReverseType() {
	const { setNewButton } = useLevelCreator()

  useEffect(() => {
    setNewButton({ type: { color: 'order-changer', purpose: 'reverse' }, text: 'Reverse' })
  }, [])

  return (
    <></>
  )
}

export default ReverseType