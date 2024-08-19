import React, { useEffect, useState } from 'react'
import api from '../axios'
import { useAuth } from './AuthProvider'
import LevelCard from './LevelCard'
import PlayLevel from './LevelCreator/PlayLevel'
import { useNavigate } from 'react-router-dom'

function MyLevels() {
	const [levels, setLevels] = useState(null)
	const [selectedLevel, setSelectedLevel] = useState(null)
	const { user } = useAuth()

  const navigate = useNavigate()

	useEffect(() => {
		const fetchLevels = async () => {
			try {
				const response = await api.get(`/levels/username/${user.username}`)
				setLevels(response.data)
			} catch (error) {
				console.log(`error is`, error)
			}
		}

		fetchLevels()
	}, [])

  function handleLevelSelect(levelId) {
    navigate(`/play/${levelId}`)
  }

	if (!levels) {
		return <div>Loading...</div>
	}

	return (
		<>
			{selectedLevel && (
				<button
					style={{ position: 'absolute', marginTop: '2rem', marginLeft: '2rem' }}
					onClick={() => setSelectedLevel(null)}
				>
					back to levels
				</button>
			)}
			{!selectedLevel &&
				levels.map((level, index) => (
					<LevelCard
						levelData={level}
						index={index}
						id={level._id}
						key={level._id}
						onPlay={() => handleLevelSelect(level._id)} // Set the selected level
					/>
				))}
			{selectedLevel && <PlayLevel levelData={selectedLevel} setLevelData={setSelectedLevel} />}
		</>
	)
}

export default MyLevels
