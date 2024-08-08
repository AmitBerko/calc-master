import React, { useEffect, useState } from 'react'
import { MenuItem, TextField, Grid, createTheme, ThemeProvider } from '@mui/material'
import { useLevelCreator } from '../LevelCreatorProvider'

function TransformType({ errors }) {
	const [originalValue, setOriginalValue] = useState('')
	const [newValue, setNewValue] = useState('')

	const { setNewButton } = useLevelCreator()

	useEffect(() => {
		const text = `${originalValue}=>${newValue}`
		setNewButton({
			type: { color: 'result-changer', purpose: 'transform' },
			text,
			buttonData: { originalValue, newValue: parseInt(newValue) },
		})
	}, [originalValue, newValue])

	const updatedBreakpoints = {
		xs: 0,
		sm: 375,
	}

	const updatedTheme = (theme) =>
		createTheme({
			...theme,
			breakpoints: {
				values: {
					...updatedBreakpoints,
				},
			},
		})

	return (
		<ThemeProvider theme={updatedTheme}>
			<Grid container columnSpacing={4} rowSpacing={2} px={2}>
				<Grid
					item
					xs={12}
					sm={6}
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: { xs: 'center', sm: 'end' },
					}}
				>
					<TextField
						value={originalValue}
						onChange={(e) => setOriginalValue(e.target.value)}
						fullWidth
            type='number'
						variant="standard"
						label="Original Value"
						color="secondary"
						error={!!errors.originalValue}
						helperText={errors.originalValue}
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
					</TextField>
				</Grid>
				<Grid
					item
					xs={12}
					sm={6}
					sx={{
						display: 'flex',
						justifyContent: { xs: 'center', sm: 'start' },
					}}
				>
					{' '}
					<TextField
						value={newValue}
						onChange={(e) => setNewValue(e.target.value)}
						fullWidth
						type="number"
						variant="standard"
						label="New Value"
						color="secondary"
						autoComplete="off"
						error={!!errors.newValue}
						helperText={errors.newValue}
						sx={{
							maxWidth: '200px',
							'& .MuiInputBase-input': { fontSize: '1.4rem', padding: 0, paddingBottom: '4px' },
						}}
					/>
				</Grid>
			</Grid>
		</ThemeProvider>
	)
}

export default TransformType
