import React, { useEffect, useState } from 'react'
import api from '../axios'
import { useAuth } from './AuthProvider'
import LevelCard from './LevelCard'
import Calculator from './LevelCreator/Calculator'

function MyLevels() {
	const [levels, setLevels] = useState(null)
	const [selectedLevel, setSelectedLevel] = useState(null)
	const { user } = useAuth()

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

	if (!levels) {
		return <div>Loading...</div> // Or some other loading indicator
	}

	return (
		<div>
			{!selectedLevel && levels.map((level, index) => (
				<LevelCard
					levelData={level}
					index={index}
					id={level._id}
					key={level._id}
					onPlay={() => setSelectedLevel(level)} // Set the selected level
				/>
			))}
			{selectedLevel && <Calculator levelData={selectedLevel} setLevelData={setSelectedLevel} />}
		</div>
	)
}

export default MyLevels
