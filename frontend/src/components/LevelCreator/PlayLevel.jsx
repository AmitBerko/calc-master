import React, { useEffect, useRef, useState } from 'react'
import Calculator from './Calculator'
import { Box } from '@mui/material'
import api from '../../axios'
import { useLocation, useNavigate } from 'react-router-dom'

function PlayLevel({ levelId }) {
  const navigate = useNavigate()
	const location = useLocation()
	const selectedLevelData = location.state?.selectedLevelData
	const [levelData, setLevelData] = useState(selectedLevelData || null)
	const initialized = useRef(false)

	useEffect(() => {
		const getLevelData = async () => {
			try {
				initialized.current = true
				const response = await api.get(`/levels/id/${levelId}`)
				console.log(response.data)
				setLevelData(response.data)
			} catch (error) {
				console.log('Error loading level data: ', error)
			}
		}

    // If levelData already exists, don't fetch it again
		if (initialized.current || levelData) return
		getLevelData()
	}, [])

	if (!levelData) return <div>loading level</div>

	return (
		<>
			<button
				style={{ position: 'absolute', marginTop: '2rem', marginLeft: '2rem' }}
				onClick={() => navigate('/homepage')}
			>
				back to levels
			</button>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					width: '100%',
					height: { xs: 'calc(100% - 12px)' },
					marginTop: { xs: 1.5, sm: 0 },
					justifyContent: { xs: 'center', sm: 'center' },
				}}
			>
				<Calculator levelData={levelData} setLevelData={setLevelData} />
			</Box>
		</>
	)
}

export default PlayLevel
