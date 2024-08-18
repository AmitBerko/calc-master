import { Box, MenuItem, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useLevelCreator } from '../LevelCreatorProvider'

function ShiftType({ errors }) {
	const [shiftDirection, setShiftDirection] = useState('')
	const { setNewButton } = useLevelCreator()

	useEffect(() => {
		const text = 'Shift' + (shiftDirection === 'Left' ? '<' : '>')
		setNewButton((prevButton) => ({
			...prevButton,
			color: 'order-changer',
			type: 'shift',
			text,
			buttonData: { shiftDirection },
		}))
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
				error={!!errors.shiftDirection}
				helperText={errors.shiftDirection}
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
