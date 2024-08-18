import React, { useEffect } from 'react'
import { Grid } from '@mui/material'
import CalculatorButton from './CalculatorButton'

function Calculator({ levelData, setLevelData, isLevelCreator = false }) {
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
		}

		handlePass()
	}, [levelData.didPass])

	return (
		<div className="calculator-container">
			<div className="screen-container">
				<div className="screen-content">
					<div className="level-info">
						<div className="moves">MOVES: {levelData.currentSettings.moves}</div>
						<div className="goal">GOAL: {levelData.originalSettings.goal}</div>
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
				{levelData.buttons.map((button, index) => (
					<Grid item xs={4} key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
						<CalculatorButton
							index={index}
							text={button.text}
							type={button.type}
							color={button.color}
							buttonData={button.buttonData}
							isLevelCreator={isLevelCreator}
							levelData={levelData}
							setLevelData={setLevelData}
						/>
					</Grid>
				))}
				<Grid item xs={4}>
					<CalculatorButton
						type="clear"
						color="clear"
						text="CLEAR"
						index={8}
						levelData={levelData}
						setLevelData={setLevelData}
					/>
				</Grid>
			</Grid>
		</div>
	)
}
export default Calculator
