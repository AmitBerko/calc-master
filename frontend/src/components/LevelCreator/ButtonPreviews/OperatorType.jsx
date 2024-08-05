import React from 'react'
import CalculatorButton from '../CalculatorButton'
import {
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
	useTheme,
	Grid,
	createTheme,
	ThemeProvider,
	Button,
} from '@mui/material'

function OperatorType() {
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
						defaultValue=""
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
						<MenuItem value={'x'}>x</MenuItem>
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
