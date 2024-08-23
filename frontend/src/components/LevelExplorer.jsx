import React, { useEffect, useRef, useState } from 'react'
import api from '../axios'
import { useAuth } from './AuthProvider'
import LevelCard from './LevelCard'
import { useNavigate } from 'react-router-dom'
import { Box, CircularProgress, Grid, Tab, Tabs, TextField } from '@mui/material'
import useDebounce from '../hooks/useDebounce'

function LevelExplorer() {
	const [levels, setLevels] = useState(null)
	const { user } = useAuth()
	const [areLevelsLoading, setAreLevelsLoading] = useState(!!user)
	const [activeTab, setActiveTab] = useState(user ? 'myLevels' : 'searchLevels')
	const [search, setSearch] = useState('')
	const debouncedSearch = useDebounce(search, 750)
	const [noLevels, setNoLevels] = useState(false)

	const navigate = useNavigate()

	useEffect(() => {
		const fetchLevels = async () => {
			try {
				let response
				if (activeTab === 'myLevels') {
					setAreLevelsLoading(true)
					response = await api.get('/levels/me')
					setLevels(response.data)
				}
			} catch (error) {
				console.log(error)
			} finally {
				setAreLevelsLoading(false)
			}
		}

		fetchLevels()
	}, [activeTab])

	useEffect(() => {
		const fetchLevels = async () => {
			try {
				let response
				if (activeTab === 'searchLevels') {
					setAreLevelsLoading(true)
					response = await api.get(`/levels/searchUsername/${debouncedSearch}`)
					setLevels(response.data) // This should be inside the if block
				}
			} catch (error) {
				console.log(error)
			} finally {
				setAreLevelsLoading(false)
			}
		}

		if (debouncedSearch.length <= 3) return
		fetchLevels()
	}, [debouncedSearch])

	function handleLevelSelect(levelId, levelData) {
		// Navigate to the shareable level link, and send the levelData
		navigate(`/play/${levelId}`, { state: { selectedLevelData: levelData } })
	}

	let componentToRender = null

	if (areLevelsLoading) {
		componentToRender = (
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					height: '60vh',
					alignItems: 'center',
				}}
			>
				<CircularProgress color="secondary" thickness={5} size={'calc(3vw + 4rem)'} />
			</Box>
		)
	} else if (noLevels) {
		componentToRender = <div>You dont have any levels</div>
	} else if (levels) {
		componentToRender = (
			<>
				<Box sx={{ p: { xs: 2, sm: 3 } }}>
					<Grid container spacing={3} justifyContent="center">
						{levels.map((level, index) => (
							<Grid item key={level._id} xs={12} md={6} lg={4} xl={3}>
								<Box
									sx={{
										display: 'flex',
										justifyContent: 'center',
									}}
								>
									<LevelCard
										index={index}
										onPlay={() => handleLevelSelect(level._id, level)}
										createdAt={level.createdAt}
										creatorName={level.creatorName}
										isMyLevel={user.username === level.creatorName}
									/>
								</Box>
							</Grid>
						))}
					</Grid>
				</Box>
			</>
		)
	}

	const handleTabChange = (event, newValue) => {
		setLevels(null)
		setActiveTab(newValue)
	}

	return (
		<>
			<Box sx={{ py: 3, px: { xs: 2, sm: 3 } }}>
				<Tabs value={activeTab} onChange={handleTabChange} sx={{ marginBottom: '1.5rem' }}>
					<Tab label="My Levels" disabled={!user} value="myLevels" />
					<Tab label="Search Levels" value="searchLevels" />
				</Tabs>
				{activeTab === 'searchLevels' && (
					<TextField
						sx={{ marginBottom: { xs: 2, sm: 3 } }}
						color="secondary"
						variant="standard"
						label="Username To Search"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
				)}
				{componentToRender}
			</Box>
		</>
	)
}

export default LevelExplorer
