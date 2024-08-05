import React from 'react'
import { Grid } from '@mui/material'
import CalculatorButton from './CalculatorButton'
import TypesModal from './TypesModal'
import { useLevelCreator } from './LevelCreatorProvider'

function LevelCreator() {
	const { currentButtons } = useLevelCreator()

	return (
		<div className="calculator-container">
			<div className="screen-container">
				<div className="screen-content">
					<div className="level-info">
						<div className="moves">MOVES: 4</div>
						<div className="goal">GOAL: 1234</div>
					</div>
					<div className="result-container">
						<div className="result">12345678</div>
					</div>
				</div>
			</div>
			<Grid container columnSpacing={2} rowSpacing={4.5} className="buttons-container">
				{currentButtons.map((button, index) => {
					return (
						<Grid item xs={4} key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
							<CalculatorButton text={button.text} type={button.type} index={index} />
						</Grid>
					)
				})}

				{/* Static button */}
				<Grid item xs={4}>
					<CalculatorButton type="clear" text="CLEAR" index={8} />
				</Grid>
			</Grid>
			<TypesModal />
		</div>
	)
}

export default LevelCreator
