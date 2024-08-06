import React, { useEffect, useState } from 'react'
import { MenuItem, TextField, Grid, createTheme, ThemeProvider } from '@mui/material'
import { useLevelCreator } from '../LevelCreatorProvider'

function OperatorType() {
	const [operator, setOperator] = useState('')
	const [value, setValue] = useState('')

	const { setNewButton } = useLevelCreator()

	useEffect(() => {
		const text = `${operator}${value}`
		setNewButton({ type: 'operator', text, buttonData: { operator, value: parseInt(value) } })
	}, [operator, value])

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
						select
						value={operator}
						onChange={(e) => setOperator(e.target.value)}
						fullWidth
						variant="standard"
						label="Operator"
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
						<MenuItem value={'+'}>+</MenuItem>
						<MenuItem value={'-'}>-</MenuItem>
						<MenuItem value={'*'}>x</MenuItem>
						<MenuItem value={'/'}>/</MenuItem>
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
						value={value}
						onChange={(e) => setValue(e.target.value)}
						fullWidth
						variant="standard"
						label="Value"
						color="secondary"
						autoComplete="off"
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

export default OperatorType
