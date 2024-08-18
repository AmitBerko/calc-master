import React, { useEffect, useState } from 'react'
import { Grid } from '@mui/material'
import CalculatorButton from './CalculatorButton'
import { useLevelCreator } from './LevelCreatorProvider'
import api from '../../axios'
import LevelUploadLoadingModal from './modals/LevelUploadLoadingModal'

function Calculator({ levelData, setLevelData, isLevelCreator = false }) {
	const { isLevelBeingChecked, setIsLevelBeingChecked } = useLevelCreator()
	const [isLevelUploadLoadingOpen, setIsLevelUploadLoadingOpen] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [levelUploadResponse, setLevelUploadResponse] = useState('')

  // Check if passed the level
	useEffect(() => {
		const { currentSettings, originalSettings } = levelData
		if (
			currentSettings.result === currentSettings.goal &&
			originalSettings.result !== currentSettings.result &&
			!levelData.didPass
		) {
			setLevelData((prevLevelData) => ({ ...prevLevelData, didPass: true }))
		}
	}, [levelData.currentSettings.result])

  // Handle level pass
	useEffect(() => {
		const handlePass = async () => {
			if (!levelData.didPass || levelData.length === 0) return

			// Sets the result to "SUCCESS"
			setTimeout(() => {
				setLevelData((prevLevelData) => ({
					...prevLevelData,
					currentSettings: { ...prevLevelData.currentSettings, result: 'SUCCESS' },
				}))
			}, 500)

			// Relevant only if the level is being checked before saving it
			setTimeout(async () => {
				if (isLevelBeingChecked) {
					try {
						const minimumLoadTime = 750
						setIsLoading(true)
						setIsLevelUploadLoadingOpen(true)

						const startTime = Date.now()
						const response = await api.post('/levels', levelData)
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
						setIsLoading(false)
            setIsLevelBeingChecked(false)
					}
				}
			}, 1000)
		}

		handlePass()
	}, [levelData.didPass])

	return (
		<div className="calculator-container">
			<div className="screen-container">
				<div className="screen-content">
					<div className="level-info">
						<div className="moves">MOVES: {levelData.currentSettings.moves}</div>
						<div className="goal">GOAL: {levelData.currentSettings.goal}</div>
					</div>
					<div className="result-container">
						<div className="result">{levelData.currentSettings.result}</div>
					</div>
				</div>
			</div>
			<Grid
				container
				columnSpacing={2}
				rowSpacing={{ xs: 3.5, sm: 4.5 }}
				className="buttons-container"
			>
				{levelData.buttons.map((button, index) => {
					return (
						<Grid item xs={4} key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
							<CalculatorButton
								index={index}
								text={button.text}
								type={button.type}
								buttonData={button.buttonData}
								isLevelCreator={isLevelCreator}
								levelData={levelData}
								setLevelData={setLevelData}
							/>
						</Grid>
					)
				})}

				{/* Static button */}
				<Grid item xs={4}>
					<CalculatorButton
						type={{ color: 'clear', purpose: 'clear' }}
						text="CLEAR"
						index={8}
						levelData={levelData}
						setLevelData={setLevelData}
					/>
				</Grid>
			</Grid>
			<LevelUploadLoadingModal
				isOpen={isLevelUploadLoadingOpen}
				setIsOpen={setIsLevelUploadLoadingOpen}
				isLoading={isLoading}
				levelUploadResponse={levelUploadResponse}
			/>
		</div>
	)
}

export default Calculator
