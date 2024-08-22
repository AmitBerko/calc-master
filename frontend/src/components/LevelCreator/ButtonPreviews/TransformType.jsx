import React, { useEffect, useState } from 'react'
import { TextField, Grid, createTheme, ThemeProvider, useMediaQuery } from '@mui/material'
import { useLevelCreator } from '../LevelCreatorProvider'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import { useTheme } from '@emotion/react'

function TransformType({ errors }) {
	const [originalValue, setOriginalValue] = useState('')
	const [newValue, setNewValue] = useState('')

	const { setNewButton } = useLevelCreator()
	const baseTheme = useTheme()
	useEffect(() => {
		const text = `${originalValue}➜${newValue}`

		setNewButton((prevButton) => ({
			...prevButton,
			color: 'result-changer',
			type: 'transform',
			text,
			buttonData: { originalValue, newValue: parseInt(newValue) },
		}))
	}, [originalValue, newValue])

	const updatedBreakpoints = {
		xs: 0,
		sm: 400,
	}

	const updatedTheme = createTheme({
		...baseTheme,
		breakpoints: {
			values: {
				...baseTheme.breakpoints.values,
				...updatedBreakpoints,
			},
		},
	})

	const isSmUp = useMediaQuery(updatedTheme.breakpoints.up('sm'))

	return (
		<ThemeProvider theme={updatedTheme}>
			<Grid container columnSpacing={4} rowSpacing={0} px={2}>
				<Grid
					item
					xs={12}
					sm={5}
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
						type="number"
						variant="standard"
						label="Original Value"
						color="secondary"
						error={!!errors.originalValue}
						helperText={errors.originalValue}
						autoComplete="off"
						sx={{
							maxWidth: '200px',
							'& .MuiInputBase-input': { fontSize: '1.4rem', padding: 0, paddingBottom: '4px' },
						}}
					></TextField>
				</Grid>
				<Grid item xs={12} sm={2} sx={{ display: 'flex', justifyContent: 'center' }}>
					{isSmUp ? (
						<ArrowRightAltIcon sx={{ fontSize: '3.25rem', transform: 'translateY(0.5rem)' }} />
					) : (
						<ArrowRightAltIcon
							sx={{ fontSize: '2.25rem', transform: 'rotate(90deg) translateX(1.25rem)' }}
						/>
					)}
				</Grid>
				<Grid
					item
					xs={12}
					sm={5}
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
