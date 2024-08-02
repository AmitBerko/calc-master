import React, { useState } from 'react'
import { Grid } from '@mui/material'
import CalculatorButton from './CalculatorButton'
import TypesModal from './TypesModal'

function LevelCreator() {
	const [isOpen, setIsOpen] = useState(false)
	const handleOpen = () => setIsOpen(true)
	const handleClose = () => setIsOpen(false)

	const [currentButtons, setCurrentButtons] = useState([
		{ type: 'insert', text: '12' },
		{ type: 'operator', text: '+12' },
		{ type: 'unique', text: 'Unique' },
		{ type: '', text: '' },
		{ type: '', text: '' },
		{ type: '', text: '' },
		{ type: '', text: '' },
		{ type: '', text: '' },
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
							<CalculatorButton
								text={button.text}
								handleOpen={handleOpen}
								type={button.type}
								index={index}
							/>
						</Grid>
					)
				})}

				{/* Static button */}
				<Grid item xs={4}>
					<CalculatorButton type="clear" text="CLEAR" />
				</Grid>
			</Grid>
			<TypesModal isOpen={isOpen} handleClose={handleClose} />
		</div>
	)
}

export default LevelCreator
