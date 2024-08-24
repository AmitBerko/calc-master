import React, { useEffect, useRef, useState } from 'react'
import api from '../axios'
import { useAuth } from './AuthProvider'
import LevelCard from './LevelCard'
import { useNavigate } from 'react-router-dom'
import {
	Box,
	Button,
	CircularProgress,
	Grid,
	Tab,
	Tabs,
	TextField,
	Typography,
} from '@mui/material'
import useDebounce from '../hooks/useDebounce'
import sadCalculatorImage from '../assets/test-removebg-preview.png'

function LevelExplorer({ setSelectedComponent }) {
	const [levels, setLevels] = useState(null)
	const { user } = useAuth()
	const [areLevelsLoading, setAreLevelsLoading] = useState(!!user)
	const [activeTab, setActiveTab] = useState(user ? 'myLevels' : 'searchLevels')
	const [search, setSearch] = useState('')
	const debouncedSearch = useDebounce(search, 750)

	const navigate = useNavigate()

	useEffect(() => {
		const fetchLevels = async () => {
			try {
				let response
				setAreLevelsLoading(true)

				if (activeTab === 'myLevels') {
					response = await api.get('/levels/me')
				} else if (activeTab === 'searchLevels') {
					response = await api.get('/levels')
				}
				setLevels(response.data)
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

		if (debouncedSearch.length <= 2) return
		fetchLevels()
	}, [debouncedSearch])

	function handleLevelSelect(levelId, levelData) {
		// Navigate to the shareable level link, and send the levelData
		navigate(`/play/${levelId}`, { state: { selectedLevelData: levelData } })
	}

	async function onDelete(levelId) {
		try {
			await api.delete(`/levels/${levelId}`)
			setLevels((prevLevels) => {
				const filteredLevels = prevLevels.filter((level) => level._id !== levelId)
				return filteredLevels
			})
		} catch (error) {
			console.log(error)
		}
	}

	let componentToRender = null

	if (areLevelsLoading) {
		componentToRender = (
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					height: '20vh',
					alignItems: 'center',
				}}
			>
				<CircularProgress color="secondary" thickness={5} size={'calc(3vw + 4rem)'} />
			</Box>
		)
	} else if (levels?.length === 0) {
		componentToRender = (
			<Box sx={{ display: 'flex', justifyContent: 'center' }}>
				<Box
					sx={{
						display: 'inline-flex',
						justifyContent: 'center',
						alignItems: 'center',
						flexDirection: 'column',
						px: { xs: '1.25rem', sm: '3rem' },
						py: '2.5rem',
						backgroundColor: 'rgb(30, 30, 30)',
						borderRadius: '1rem',
						boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
					}}
				>
					<img
						width={'90%'}
						style={{
							borderRadius: '1rem',
							marginBottom: '2rem',
							boxShadow: '0 0 15px rgba(255, 255, 255, 0.1)',
							maxWidth: '350px',
						}}
						src={sadCalculatorImage}
						alt="Sad Calculator"
					/>
					<Typography
						variant="h4"
						align="center"
						sx={{
							fontWeight: 'bold',
							marginBottom: '1rem',
							textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
						}}
					>
						No Levels Found
					</Typography>

					<Typography
						variant="body1"
						align="center"
						sx={{
							color: '#bbb',
							maxWidth: '80%',
							marginBottom: activeTab === 'myLevels' ? '1.5rem' : '0',
						}}
					>
						{activeTab === 'myLevels'
							? 'Design your first challenge here:'
							: 'Make sure the username is spelled correctly'}
					</Typography>

					{activeTab === 'myLevels' && (
						<Button
							variant="contained"
							color="success"
							sx={{
								padding: '10px 20px',
								fontSize: '1rem',
								color: 'rgba(255, 255, 255, 0.85)',
							}}
							onClick={() => setSelectedComponent('levelCreator')}
						>
							Create a Level
						</Button>
					)}
				</Box>
			</Box>
		)
	} else if (levels) {
		componentToRender = (
			<>
				<Box sx={{ p: { xs: 0, sm: 2 } }}>
					<Grid container spacing={4} justifyContent="center">
						{levels.map((level) => (
							<Grid item key={level._id} xs={12} md={6} lg={4}>
								<Box
									sx={{
										display: 'flex',
										justifyContent: 'center',
									}}
								>
									<LevelCard
										onPlay={() => handleLevelSelect(level._id, level)}
										createdAt={level.createdAt}
										creatorName={level.creatorName}
										originalSettings={level.originalSettings}
										isMyLevel={user?.username === level.creatorName}
										onDelete={() => onDelete(level._id)}
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
		setSearch('')
	}

	return (
		<>
			<Box sx={{ py: 3, px: { xs: 2, sm: 3 } }}>
				<Tabs
					value={activeTab}
					onChange={handleTabChange}
					sx={{
						marginBottom: '1.5rem',
						'& .MuiTabs-scroller': { display: 'flex', justifyContent: 'center' },
					}}
				>
					<Tab label="My Levels" disabled={!user} value="myLevels" />
					<Tab label="Search Levels" value="searchLevels" />
				</Tabs>
				{activeTab === 'searchLevels' && (
					<>
						<Box sx={{ display: 'flex', justifyContent: 'center' }}>
							<TextField
								sx={{ marginBottom: { xs: 2, sm: 3 }, width: '15rem' }}
								color="secondary"
								variant="standard"
								label="Filter By Username"
								value={search}
								onChange={(e) => setSearch(e.target.value)}
							/>
						</Box>
					</>
				)}
				{componentToRender}
			</Box>
		</>
	)
}

export default LevelExplorer
