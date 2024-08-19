import React from 'react'
import { useNavigate } from 'react-router-dom'

function LevelCard({ onPlay, index, id, levelData }) {
	const navigate = useNavigate()

	function handlePlayLevel() {
		console.log(levelData)
		onPlay()
	}

	return (
		<div>
			LevelCard
			<button onClick={handlePlayLevel}>play level {index}</button>
		</div>
	)
}

export default LevelCard
