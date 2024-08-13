import React, { useState } from 'react'
import TypesModal from './TypesModal'
import Calculator from './Calculator'
import { Box, Button, Grid } from '@mui/material'
import LevelSettingsModal from './LevelSettingsModal'

function LevelCreator() {
	const [isLevelSettingsOpen, setIsLevelSettingsOpen] = useState(false)

	return (
		<>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
          width: '100%',
          height: {xs: 'calc(100% - 1.5)', sm: '100%'},
          marginTop: {xs: 1.5, sm: 0},
          justifyContent: {xs: 'start', sm: 'center'}
				}}
			>
				<Calculator />
				<Box
					sx={{
						width: '100%',
						maxWidth: '450px',
						display: 'flex',
						justifyContent: 'center',
						mt: { xs: 1.5, sm: 2.5, md: 3},
					}}
				>
					<Grid
						container
						columnSpacing={3}
						rowSpacing={1.5}
						sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', px: '1rem' }}
					>
						<Grid item xs={12} sm={6}>
							<Button
								variant="contained"
								color="success"
								fullWidth
								sx={{ minWidth: '182px' }}
								onClick={() => setIsLevelSettingsOpen(true)}
							>
								Edit Level Settings
							</Button>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Button variant="outlined" color="success" fullWidth sx={{ minWidth: '182px' }}>
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
