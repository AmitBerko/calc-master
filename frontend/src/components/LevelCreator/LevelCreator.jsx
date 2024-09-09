import React, { useState, useEffect } from 'react'
import { Box, Button, Grid } from '@mui/material'
import Calculator from './Calculator'
import TypesModal from './modals/TypesModal'
import LevelSettingsModal from './modals/LevelSettingsModal'
import DeleteButtonModal from './modals/DeleteButtonModal'
import UploadLevelConfirmModal from './modals/UploadLevelConfirmModal'
import LevelUploadLoadingModal from './modals/LevelUploadLoadingModal'
import { useLevelCreator } from './LevelCreatorProvider'
import api from '../../axios'
import { useAuth } from '../AuthProvider'
import obfuscator from '../../../obfuscator'

function LevelCreator() {
	const { levelCreatorData, setLevelCreatorData, isLevelBeingChecked, setIsLevelBeingChecked } =
		useLevelCreator()
	const [isLevelSettingsOpen, setIsLevelSettingsOpen] = useState(false)
	const [isUploadLevelConfirmOpen, setIsUploadLevelConfirmOpen] = useState(false)
	const [isLevelUploadModalOpen, setIsLevelUploadModalOpen] = useState(false)
	const [isLevelUploadLoading, setIsLevelUploadLoading] = useState(false)
	const [levelUploadResponse, setLevelUploadResponse] = useState('')
	const { user } = useAuth()

	useEffect(() => {
		const handlePass = async () => {
			if (!levelCreatorData.didPass || levelCreatorData.length === 0) return

			// Sets the result to "SUCCESS"
			setTimeout(() => {
				setLevelCreatorData((prevLevelData) => ({
					...prevLevelData,
					currentSettings: { ...prevLevelData.currentSettings, result: 'SUCCESS' },
				}))
			}, 500)

			// Relevant only if the level is being checked
			setTimeout(async () => {
				if (isLevelBeingChecked) {
					try {
						const minimumLoadTime = 750
						setIsLevelUploadLoading(true)
						setIsLevelUploadModalOpen(true)

						const startTime = Date.now()
						const obfuscatedData = obfuscator({
							buttons: levelCreatorData.buttons,
							originalSettings: levelCreatorData.originalSettings,
							creatorName: user?.username,
						})
						console.log(obfuscatedData)
						// Only sending the needed fields
						const response = await api.post('/levels', { obfuscatedData })
						const elapsedTime = Date.now() - startTime
						const waitTime = Math.max(minimumLoadTime - elapsedTime, 0)

						// Wait a minimum time of 750 so it won't look weird
						await new Promise((resolve) => setTimeout(resolve, waitTime))
						setLevelUploadResponse(response.data.message)
					} catch (error) {
						await new Promise((resolve) => setTimeout(resolve, 250))
						let responseMessage = ''
						if (error.response.data.error === 'Refresh token was not found') {
							responseMessage = 'Sorry, in order to save your level you must be logged in'
						} else {
							responseMessage = error.response.data.error
						}
						setLevelUploadResponse(responseMessage)
					} finally {
						setIsLevelUploadLoading(false)
						setIsLevelBeingChecked(false)
					}
				}
			}, 1000)
		}

		handlePass()
	}, [levelCreatorData.didPass])

	return (
		<>
			<Calculator
				levelData={levelCreatorData}
				isLevelCreator={!isLevelBeingChecked}
				setLevelData={setLevelCreatorData}
			/>
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

			<TypesModal />
			<LevelSettingsModal
				isLevelSettingsOpen={isLevelSettingsOpen}
				setIsLevelSettingsOpen={setIsLevelSettingsOpen}
			/>
			<DeleteButtonModal />
			<UploadLevelConfirmModal
				isUploadLevelConfirmOpen={isUploadLevelConfirmOpen}
				setIsUploadLevelConfirmOpen={setIsUploadLevelConfirmOpen}
			/>
			<LevelUploadLoadingModal
				isOpen={isLevelUploadModalOpen}
				setIsOpen={setIsLevelUploadModalOpen}
				isLoading={isLevelUploadLoading}
				levelUploadResponse={levelUploadResponse}
			/>
		</>
	)
}

export default LevelCreator
