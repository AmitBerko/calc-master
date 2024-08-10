import React from 'react'
import { Box, Typography, Divider } from '@mui/material'
import DescriptionIcon from '@mui/icons-material/Description'
import ExampleIcon from '@mui/icons-material/Code'
function ButtonDescription({ description, example }) {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				marginTop: '1.5rem',
				padding: '0.5rem',
        paddingTop: '0.8rem',
				borderRadius: '12px',
				maxWidth: '400px',
				border: '1px solid #ddd',
				mx: 'auto',
			}}
		>
			<Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '0.75rem' }}>
				<DescriptionIcon sx={{ marginRight: '0.5rem', color: 'primary.main' }} />
				<Typography variant="h6" sx={{ fontWeight: 'bold' }}>
					Description
				</Typography>
			</Box>
			<Typography
				variant="body1"
				sx={{
					marginBottom: '0.5rem',
					backgroundColor: 'rgb(46, 46, 48)',
					padding: '1rem',
					borderRadius: '8px',
				}}
			>
				{description}
			</Typography>

			<Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '0.75rem' }}>
				<ExampleIcon sx={{ marginRight: '0.5rem', color: 'primary.main' }} />
				<Typography variant="h6" sx={{ fontWeight: 'bold' }}>
					Example
				</Typography>
			</Box>
			<Box
				sx={{
					backgroundColor: 'rgb(46, 46, 48)',
					padding: '1rem',
					borderRadius: '8px',
				}}
			>
				<Typography variant="body1">
					{example}
				</Typography>
			</Box>
		</Box>
	)
}

export default ButtonDescription
