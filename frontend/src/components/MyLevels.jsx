import React, { useEffect, useRef, useState } from 'react'
import api from '../axios'
import { useAuth } from './AuthProvider'
import LevelCard from './LevelCard'
import { useNavigate } from 'react-router-dom'

function MyLevels() {
	const [levels, setLevels] = useState([])
	const [areLevelsLoading, setAreLevelsLoading] = useState(false)
	const initialized = useRef(false)
	const { user } = useAuth()

	if (!user) {
		return <div>Must be logged in</div>
	}

	const navigate = useNavigate()

	useEffect(() => {
		const fetchLevels = async () => {
			try {
				setAreLevelsLoading(true)
				initialized.current = true
				const response = await api.get(`/levels/username/${user.username}`)
				setLevels(response.data)
			} catch (error) {
				console.log(`error is`, error)
			} finally {
				setAreLevelsLoading(false)
			}
		}

		// Make sure it only sends 1 request
		if (initialized.current) return
		fetchLevels()
	}, [user.username])

	function handleLevelSelect(levelId, levelData) {
		// Navigate to the shareable level link, and send the levelData
		navigate(`/play/${levelId}`, { state: { selectedLevelData: levelData } })
	}

	if (areLevelsLoading) {
		return <div>Loading...</div>
	}

  // If no levels are found
	if (levels.length === 0 && !areLevelsLoading && initialized.current) {
		return <div>You dont have any levels</div>
	}

	return (
		<>
			{levels.map((level, index) => (
				<LevelCard
					levelData={level}
					index={index}
					id={level._id}
					key={level._id}
					onPlay={() => handleLevelSelect(level._id, level)}
				/>
			))}
		</>
	)
}

export default MyLevels
