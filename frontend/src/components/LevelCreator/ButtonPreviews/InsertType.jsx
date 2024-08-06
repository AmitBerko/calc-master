import { Box, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useLevelCreator } from '../LevelCreatorProvider'

function InsertType() {
	const [value, setValue] = useState('')
	const { setNewButton } = useLevelCreator()

	useEffect(() => {
		setNewButton({ type: {color: 'insert'}, text: value, buttonData: { value: parseInt(value) } })
	}, [value])

	return (
		<Box sx={{ display: 'flex', justifyContent: 'center' }}>
			<TextField
				label="Value"
				color="secondary"
				variant="standard"
				type="number"
				value={value}
				onChange={(e) => setValue(e.target.value)}
				sx={{
					maxWidth: '200px',
					'& .MuiInputBase-input': {
						fontSize: '1.4rem',
						padding: 0,
						paddingBottom: '4px',
					},
				}}
			></TextField>
		</Box>
	)
}

export default InsertType
