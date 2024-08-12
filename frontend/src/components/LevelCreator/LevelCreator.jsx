import React, { useState } from 'react'
import TypesModal from './TypesModal'
import { useLevelCreator } from './LevelCreatorProvider'
import Calculator from './Calculator'
import { Box, Button, Grid } from '@mui/material'
import LevelSettingsModal from './LevelSettingsModal'

function LevelCreator() {
	const { currentButtons, result, goal, moves } = useLevelCreator()
	const [isLevelSettingsOpen, setIsLevelSettingsOpen] = useState(false)

	return (
		<>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: { xs: 'center', lg: 'center' }, // Maybe change lg to "start"
				}}
			>
				<Calculator currentButtons={currentButtons} result={result} goal={goal} moves={moves} />
				<Box
					sx={{
						width: '100%',
						maxWidth: '450px',
						display: 'flex',
						justifyContent: 'center',
						mt: { xs: 6, sm: 4 },
					}}
				>
					<Grid
						container
						columnSpacing={3}
						rowSpacing={2}
						sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', px: '1rem' }}
					>
						<Grid item xs={12} sm={6}>
							<Button
								variant="contained"
								color="success"
								fullWidth
								onClick={() => setIsLevelSettingsOpen(true)}
							>
								Edit Level Settings
							</Button>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Button variant="outlined" color="success" fullWidth>
								Upload Level
							</Button>
						</Grid>
					</Grid>
				</Box>
			</Box>
			<TypesModal />
			<LevelSettingsModal
				isLevelSettingsOpen={isLevelSettingsOpen}
				setIsLevelSettingsOpen={setIsLevelSettingsOpen}
			/>
		</>
	)
}

export default LevelCreator
