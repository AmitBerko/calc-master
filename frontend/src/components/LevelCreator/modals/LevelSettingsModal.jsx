import { Modal, Box, Typography, Grid, TextField, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useLevelCreator } from '../LevelCreatorProvider'

function LevelSettingsModal({ isLevelSettingsOpen, setIsLevelSettingsOpen }) {
	const [newResult, setNewResult] = useState(0)
	const [newMoves, setNewMoves] = useState(0)
	const [newGoal, setNewGoal] = useState(0)
	const { levelCreatorData, setLevelCreatorData } = useLevelCreator()
	const [error, setError] = useState({})

	useEffect(() => {
		// Made it so when the modal mounts it will be easier to edit the current values
		setNewResult(levelCreatorData.originalSettings.result)
		setNewMoves(levelCreatorData.originalSettings.moves)
		setNewGoal(levelCreatorData.originalSettings.goal)
	}, [])

	function saveSettings() {
    setError({})
		if (newResult === '') {
			setError((prevErrors) => ({ ...prevErrors, result: 'Oops! you missed the result setting' }))
			return
		} else if (newMoves === '') {
			setError((prevErrors) => ({
				...prevErrors,
				moves: 'Oops! you missed the moves setting',
			}))
			return
		} else if (newGoal === '') {
			setError((prevErrors) => ({ ...prevErrors, goal: 'Oops! you missed the goal setting' }))
			return
		}

		const newSettings = {
			result: parseInt(newResult),
			goal: parseInt(newGoal),
			moves: parseInt(newMoves),
		}

		if (newSettings.result === newSettings.goal) {
			setError((prevErrors) => ({ ...prevErrors, goal: "Initial result and goal can't be equal" }))
			return
		}

		setLevelCreatorData((prevLevelData) => ({
			...prevLevelData,
			currentSettings: newSettings,
			originalSettings: newSettings,
			didPass: false,
		}))
		setIsLevelSettingsOpen(false)
	}

	return (
		<Modal open={isLevelSettingsOpen} onClose={() => setIsLevelSettingsOpen(false)}>
			<Box
				sx={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: {
						xs: 'translate(-50%, -50%)',
						sm: 'translate(calc(-50% + 95px), -50%)',
					},
					bgcolor: 'rgb(50, 50, 52)',
					border: '2px solid #000',
					boxShadow: 24,
					p: { xs: 2.5, sm: 4 },
					pt: { sm: 1.65 },
					textAlign: 'center',
					width: 'min(400px, 90vw)',
					borderRadius: '1rem',
				}}
			>
				<Typography
					variant="subtitle2"
					gutterBottom
					sx={{
						display: 'flex',
						justifyContent: 'center',
						textAlign: 'center',
						fontSize: 'min(2.5rem, calc(1.5rem + 2vw))',
					}}
				>
					Level Settings
				</Typography>
				<Grid
					container
					rowSpacing={2.25}
					columnSpacing={2}
					sx={{ display: 'flex', justifyContent: 'center' }}
				>
					<Grid item xs={12}>
						<TextField
							type="number"
							value={newResult}
							onChange={(e) => setNewResult(e.target.value)}
							color="secondary"
							label="Initial Result"
							fullWidth
							error={!!error.result}
							helperText={error.result}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							type="number"
							value={newMoves}
							onChange={(e) => setNewMoves(e.target.value)}
							color="secondary"
							label="Moves"
							fullWidth
							error={!!error.moves}
							helperText={error.moves}
						/>
					</Grid>
					<Grid item xs={12} sx={{ mb: '0.45rem' }}>
						<TextField
							type="number"
							value={newGoal}
							onChange={(e) => setNewGoal(e.target.value)}
							color="secondary"
							label="Goal"
							fullWidth
							error={!!error.goal}
							helperText={error.goal}
						/>
					</Grid>
					{/* Buttons */}
					<Grid item xs={12} sm={6}>
						<Button variant="contained" color="primary" fullWidth onClick={saveSettings}>
							Save Settings
						</Button>
					</Grid>
					<Grid item xs={12} sm={6} sx={{ pt: '1rem !important' }}>
						<Button variant="outlined" fullWidth onClick={() => setIsLevelSettingsOpen(false)}>
							Cancel
						</Button>
					</Grid>
				</Grid>
			</Box>
		</Modal>
	)
}

export default LevelSettingsModal
