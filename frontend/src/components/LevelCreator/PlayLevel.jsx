import React, { useEffect, useRef, useState } from 'react'
import Calculator from './Calculator'
import { Box, Button } from '@mui/material'
import { ArrowBack } from '@mui/icons-material'
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
			<Button
				variant="contained"
				startIcon={<ArrowBack />}
				onClick={() => navigate('/homepage')}
				sx={{
          position: 'absolute',
          marginTop: '1rem',
          marginLeft: '1rem',
					backgroundColor: 'rgba(255, 255, 255, 0.1)',
					fontWeight: 'bold',
					borderRadius: '1rem',
					boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
					'&:hover': {
						backgroundColor: 'rgba(255, 255, 255, 0.175)',
						boxShadow: '0 6px 8px rgba(0, 0, 0, 0.2)',
					},
				}}
			>
				Back
			</Button>
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
