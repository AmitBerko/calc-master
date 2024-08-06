import React from 'react'
import { Grid } from '@mui/material'
import CalculatorButton from './CalculatorButton'

function Calculator({ currentButtons, result }) {
	return (
		<div className="calculator-container">
			<div className="screen-container">
				<div className="screen-content">
					<div className="level-info">
						<div className="moves">MOVES: 4</div>
						<div className="goal">GOAL: 1234</div>
					</div>
					<div className="result-container">
						<div className="result">{result}</div>
					</div>
				</div>
			</div>
			<Grid container columnSpacing={2} rowSpacing={4.5} className="buttons-container">
				{currentButtons.map((button, index) => {
					return (
						<Grid item xs={4} key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
							<CalculatorButton
								index={index}
								text={button.text}
								type={button.type}
								buttonData={button.buttonData}
							/>
						</Grid>
					)
				})}

				{/* Static button */}
				<Grid item xs={4}>
					<CalculatorButton type={{color: 'clear'}} text="CLEAR" index={8} />
				</Grid>
			</Grid>
		</div>
	)
}

export default Calculator
