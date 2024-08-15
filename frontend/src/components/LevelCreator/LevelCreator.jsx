import React, { useState } from 'react'
import TypesModal from './TypesModal'
import Calculator from './Calculator'
import { Box, Button, Grid } from '@mui/material'
import LevelSettingsModal from './LevelSettingsModal'
import { useLevelCreator } from './LevelCreatorProvider'
import DeleteButtonModal from './DeleteButtonModal'
import UploadLevelModal from './UploadLevelModal'

function LevelCreator() {
	const [isLevelSettingsOpen, setIsLevelSettingsOpen] = useState(false)
	const { levelData } = useLevelCreator()
	const [isLevelBeingChecked, setIsLevelBeingChecked] = useState(false)
	const [isUploadLevelConfirmOpen, setIsUploadLevelConfirmOpen] = useState(false)

	return (
		<>
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
				<Calculator levelData={levelData} isLevelCreator={!isLevelBeingChecked} />
				<Box
					sx={{
						width: '100%',
						maxWidth: '450px',
						display: 'flex',
						justifyContent: 'center',
						mt: { xs: 1.5, sm: 2.5, md: 3 },
					}}
				>
					<Grid
						container
						columnSpacing={3}
						rowSpacing={1.5}
						sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', px: '1rem' }}
					>
						{isLevelBeingChecked ? (
							<Grid item xs={12}>
								<Button
									variant="contained"
									color="error"
									fullWidth
									sx={{ minWidth: '182px' }}
									onClick={() => setIsLevelBeingChecked(false)}
								>
									Return To Level Creator
								</Button>
							</Grid>
						) : (
							<>
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
									<Button
										variant="outlined"
										onClick={() => setIsUploadLevelConfirmOpen(true)}
										color="success"
										fullWidth
										sx={{ minWidth: '182px' }}
									>
										Upload Level
									</Button>
								</Grid>
							</>
						)}
					</Grid>
				</Box>
			</Box>
			<TypesModal />
			<LevelSettingsModal
				isLevelSettingsOpen={isLevelSettingsOpen}
				setIsLevelSettingsOpen={setIsLevelSettingsOpen}
			/>
			<DeleteButtonModal />
			<UploadLevelModal
				isUploadLevelConfirmOpen={isUploadLevelConfirmOpen}
				setIsUploadLevelConfirmOpen={setIsUploadLevelConfirmOpen}
				setIsLevelBeingChecked={setIsLevelBeingChecked}
			/>
		</>
	)
}

export default LevelCreator
