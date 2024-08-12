import { Modal, Box, Typography, Grid, TextField, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useLevelCreator } from './LevelCreatorProvider'

function LevelSettingsModal({ isLevelSettingsOpen, setIsLevelSettingsOpen }) {
	const [updatedResult, setUpdatedResult] = useState(null)
	const [updatedMoves, setUpdatedMoves] = useState(null)
	const [updatedGoal, setUpdatedGoal] = useState(null)
  const {result, setResult, moves, setMoves, goal, setGoal} = useLevelCreator()

  useEffect(() => {
    // Made it so when the modal mounts it will be easier to edit the current values
    setUpdatedResult(result)
    setUpdatedMoves(moves)
    setUpdatedGoal(goal)
  }, [])

  function saveSettings() {
    setResult(parseInt(updatedResult))
    setMoves(parseInt(updatedMoves))
    setGoal(parseInt(updatedGoal))
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
							value={updatedResult}
							onChange={(e) => setUpdatedResult(e.target.value)}
							color="secondary"
							label="Initial Result"
							fullWidth
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							type="number"
							value={updatedMoves}
							onChange={(e) => setUpdatedMoves(e.target.value)}
							color="secondary"
							label="Moves"
							fullWidth
						/>
					</Grid>
					<Grid item xs={12} sx={{ mb: '0.45rem' }}>
						<TextField
							type="number"
							value={updatedGoal}
							onChange={(e) => setUpdatedGoal(e.target.value)}
							color="secondary"
							label="Goal"
							fullWidth
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
