import { Box, MenuItem, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useLevelCreator } from '../LevelCreatorProvider'

function SortType({ errors }) {
	const [sortMode, setSortMode] = useState('')
	const { setNewButton } = useLevelCreator()

	useEffect(() => {
		const text = 'Sort' + (sortMode === 'Ascending' ? '>' : '<')
		setNewButton({
			type: { color: 'order-changer', purpose: 'sort' },
			text,
			buttonData: { sortMode },
		})
	}, [sortMode])

	return (
		<Box sx={{ display: 'flex', justifyContent: 'center' }}>
			<TextField
				select
				value={sortMode}
				onChange={(e) => setSortMode(e.target.value)}
				fullWidth
				variant="standard"
				label="Sort Mode"
				color="secondary"
				error={!!errors.sortMode}
				helperText={errors.sortMode}
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
				<MenuItem value={'Ascending'}>Ascending</MenuItem>
				<MenuItem value={'Descending'}>Descending</MenuItem>
			</TextField>
		</Box>
	)
}

export default SortType
