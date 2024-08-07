import { Box, MenuItem, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useLevelCreator } from '../LevelCreatorProvider'

function ShiftType() {
	const [shiftDirection, setShiftDirection] = useState('')
	const { setNewButton } = useLevelCreator()

	useEffect(() => {
		const text = 'Shift' + (shiftDirection === 'Left' ? '<' : '>')
		setNewButton({
			type: { color: 'order-changer', purpose: 'shift' },
			text,
			buttonData: { shiftDirection },
		})
	}, [shiftDirection])

	return (
		<Box sx={{ display: 'flex', justifyContent: 'center' }}>
			<TextField
				select
				value={shiftDirection}
				onChange={(e) => setShiftDirection(e.target.value)}
				fullWidth
				variant="standard"
				label="Direction"
				color="secondary"
				sx={{
					maxWidth: '200px',
					'& .MuiSelect-select': {
						fontSize: '1.4rem',
						display: 'flex',
						alignItems: 'center',
						paddingTop: 0,
						paddingBottom: '4px',
					},
				}}
			>
				<MenuItem value={'Left'}>Left</MenuItem>
				<MenuItem value={'Right'}>Right</MenuItem>
			</TextField>
		</Box>
	)
}

export default ShiftType
