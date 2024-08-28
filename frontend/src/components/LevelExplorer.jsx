import React, { useEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../axios'
import { useAuth } from './AuthProvider'
import LevelCard from './LevelCard'
import sadCalculatorImage from '../assets/sad-robot.png'
import {
	Box,
	Button,
	CircularProgress,
	Grid,
	InputBase,
	Tab,
	Tabs,
	TextField,
	Tooltip,
	Typography,
} from '@mui/material'
import {Search} from '@mui/icons-material'

function LevelExplorer({ setSelectedComponent }) {
	const [levels, setLevels] = useState(null)
	const { user } = useAuth()
	const [isLoading, setIsLoading] = useState(true)
	const [activeTab, setActiveTab] = useState(user ? 'myLevels' : 'searchLevels')
	const [usernameFilter, setUsernameFilter] = useState('')
	const navigate = useNavigate()

	useEffect(() => {
		const img = new Image()
		img.src = sadCalculatorImage
	}, [])

	useEffect(() => {
		fetchLevels()
	}, [activeTab, user])

	const fetchLevels = async () => {
		try {
			setIsLoading(true)
			const endpoint = activeTab === 'myLevels' ? '/levels/me' : '/levels'
			const response = await api.get(endpoint)
			setLevels(response.data)
		} catch (error) {
			console.error('Error fetching levels:', error)
		} finally {
			setIsLoading(false)
		}
	}

	const filteredLevels = levels
		? levels.filter((level) =>
				level.creatorName.toLowerCase().startsWith(usernameFilter.toLowerCase())
		  )
		: []

	const handleLevelSelect = (levelId, levelData) => {
		navigate(`/play/${levelId}`, { state: { selectedLevelData: levelData } })
	}

	const handleDelete = async (levelId) => {
		try {
			await api.delete(`/levels/${levelId}`)
			setLevels((prevLevels) => prevLevels.filter((level) => level._id !== levelId))
		} catch (error) {
			console.error('Error deleting level:', error)
		}
	}

	const handleTabChange = () => {
		setLevels(null)
		setIsLoading(true)
	}

	const renderContent = () => {
		if (isLoading) {
			return <LoadingSpinner />
		}
		if (!filteredLevels.length) {
			return <NoLevelsFound activeTab={activeTab} setSelectedComponent={setSelectedComponent} />
		}
		return (
			<LevelGrid
				levels={filteredLevels}
				user={user}
				onPlay={handleLevelSelect}
				onDelete={handleDelete}
			/>
		)
	}

	return (
		<Box sx={{ py: 3, px: { xs: 2, sm: 3 } }}>
			<TabSelector
				activeTab={activeTab}
				setActiveTab={setActiveTab}
				user={user}
				handleTabChange={handleTabChange}
			/>
			{activeTab === 'searchLevels' && (
				<UsernameFilter value={usernameFilter} onChange={setUsernameFilter} />
			)}
			{renderContent()}
		</Box>
	)
}

const LoadingSpinner = () => (
	<Box sx={{ display: 'flex', justifyContent: 'center', height: '20vh', alignItems: 'center' }}>
		<CircularProgress color="secondary" thickness={5} size={'calc(3vw + 4rem)'} />
	</Box>
)

const NoLevelsFound = ({ activeTab, setSelectedComponent }) => (
	<Box sx={{ display: 'flex', justifyContent: 'center', px: { xs: 2, sm: 1 } }}>
		<Box
			sx={{
				display: 'inline-flex',
				justifyContent: 'center',
				alignItems: 'center',
				flexDirection: 'column',
				px: { xs: '1rem', sm: '2rem' },
				py: '2.25rem',
				backgroundColor: 'rgb(30, 30, 30)',
				borderRadius: '1rem',
				boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
			}}
		>
			<img
				width={'90%'}
				style={{
					borderRadius: '1rem',
					marginBottom: '1rem',
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
					marginBottom: { xs: '0.5rem' },
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
					marginBottom: activeTab === 'myLevels' ? '1rem' : '0',
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

const LevelGrid = ({ levels, user, onPlay, onDelete }) => (
	<Box sx={{ p: { xs: 0, sm: 2 } }}>
		<Grid container spacing={4} justifyContent="center">
			{levels.map((level) => (
				<Grid item key={level._id} xs={12} md={6} lg={4}>
					<Box sx={{ display: 'flex', justifyContent: 'center' }}>
						<LevelCard
							onPlay={() => onPlay(level._id, level)}
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
)

const TabSelector = ({ activeTab, setActiveTab, user, handleTabChange }) => (
	<Tabs
		value={activeTab}
		onChange={(_, newValue) => {
			setActiveTab(newValue)
      handleTabChange()
		}}
		sx={{
			marginBottom: '1.5rem',
			'& .MuiTabs-scroller': { display: 'flex', justifyContent: 'center' },
		}}
	>
		<Tab
			label={
				<Tooltip
					leaveTouchDelay={2250}
					title={user ? '' : 'Sorry! You must be logged in'}
					arrow
					enterTouchDelay={20}
					PopperProps={{
						modifiers: [
							{
								name: 'offset',
								options: {
									offset: [0, 6],
								},
							},
						],
						sx: {
							'& .MuiTooltip-tooltip': {
								marginTop: '0px !important',
							},
						},
					}}
				>
					<span style={{ padding: '12px 16px', pointerEvents: 'auto' }}>My Levels</span>
				</Tooltip>
			}
			disabled={!user}
			sx={{ p: 0 }}
			value="myLevels"
		/>
		<Tab label="Search Levels" value="searchLevels" />
	</Tabs>
)

const UsernameFilter = ({ value, onChange }) => (
	<Box
		sx={{
			display: 'flex',
      justifyContent: 'center',
			mb: 3,
		}}
	>

		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				width: '100%',
				maxWidth: '20rem',
				backgroundColor: 'rgb(70, 70, 70)',
				borderRadius: '1.15rem',
				padding: '4px 12px',
				boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
			}}
		>
			<Search sx={{ color: 'text.secondary', mr: 1 }} />
			<InputBase
				sx={{
					ml: 1,
					width: '100%',
					color: 'text.primary',
					'& input': {
						padding: '8px 0',
					},
				}}
				placeholder="Enter username..."
				value={value}
				onChange={(e) => onChange(e.target.value)}
			/>
		</Box>
	</Box>
)

export default LevelExplorer
