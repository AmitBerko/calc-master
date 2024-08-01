import React, { useState } from 'react'
import { Grid } from '@mui/material'
import CalculatorButton from './CalculatorButton'

function LevelCreator() {
	const [currentButtons, setCurrentButtons] = useState([
		'+2',
		'/5',
		'btn3',
		'btn4',
		'btn5',
		'btn6',
		'btn7',
		'btn8',
		'CLEAR',
	])
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
              <CalculatorButton text={button} index={index} />
						</Grid>
					)
				})}
			</Grid>
		</div>
	)
}

export default LevelCreator
