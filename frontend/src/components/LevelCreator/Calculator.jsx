import React, { useEffect } from 'react'
import { Grid } from '@mui/material'
import CalculatorButton from './CalculatorButton'
import { useLevelCreator } from './LevelCreatorProvider'
import api from '../../axios'

function Calculator({ levelData, isLevelCreator = false }) {
	const { setLevelData, isLevelBeingChecked, didPassLevel, setDidPassLevel } = useLevelCreator()

	useEffect(() => {
		const { currentSettings, originalSettings } = levelData
		if (
			currentSettings.result === currentSettings.goal &&
			originalSettings.result !== currentSettings.result
		) {
			setDidPassLevel(true)
		}
	}, [levelData])

	useEffect(() => {
		const handlePass = async () => {
			if (!didPassLevel) return

			setTimeout(() => {
				setLevelData((prevLevelData) => ({
					...prevLevelData,
					currentSettings: { ...prevLevelData.currentSettings, result: 'SUCCESS' },
				}))
			}, 500)

			if (isLevelBeingChecked) {
				// Save the level in the database and maybe open a modal or something
				api.post('/levels', { levelData })
			}
		}

		handlePass()
	}, [didPassLevel])

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
								didPassLevel={didPassLevel} // Disable the button if its true
							/>
						</Grid>
					)
				})}

				{/* Static button */}
				<Grid item xs={4}>
					<CalculatorButton type={{ color: 'clear' }} text="CLEAR" index={8} />
				</Grid>
			</Grid>
		</div>
	)
}

export default Calculator
