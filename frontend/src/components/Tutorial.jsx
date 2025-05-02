import React from 'react'
import { Box, Typography, Paper, Button, Grid } from '@mui/material'
import { PlayArrow, Create } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

const Section = ({ title, emoji, children }) => (
	<Paper
		elevation={3}
		sx={{
			background: 'rgba(255,255,255,0.03)',
			backdropFilter: 'blur(6px)',
			borderRadius: 2,
			padding: 3,
			marginBottom: 4,
			border: '1px solid rgba(255,255,255,0.1)',
		}}
	>
		<Typography variant="h5" sx={{ fontWeight: 600, mb: 1.5, color: 'white' }}>
			{emoji} {title}
		</Typography>
		<Typography
			variant="body1"
			sx={{ lineHeight: 1.75, fontSize: '1.05rem', color: 'rgba(255,255,255,0.9)' }}
		>
			{children}
		</Typography>
	</Paper>
)

const ButtonSection = ({ title, buttons }) => (
	<Box sx={{ mb: 2 }}>
		<Typography variant="h6" sx={{ color: 'rgb(76, 167, 213)', mb: 1, fontWeight: 500 }}>
			{title}
		</Typography>
		<Grid container spacing={2}>
			{buttons.map((button, index) => (
				<Grid item xs={12} md={6} key={index}>
					<Box
						sx={{
							p: 2,
							borderRadius: 2,
							backgroundColor: 'rgba(255,255,255,0.03)',
							border: '1px solid rgba(255,255,255,0.1)',
							height: '100%',
							display: 'flex',
							flexDirection: 'column',
						}}
					>
						<Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
							<Box
								sx={{
									display: 'inline-flex',
									justifyContent: 'center',
									alignItems: 'center',
									height: '36px',
									minWidth: '36px',
									padding: '0 8px',
									borderRadius: '6px',
									backgroundColor: button.bgColor,
									color: button.textColor ?? 'white',
									fontWeight: 'bold',
									mr: 2,
								}}
							>
								{button.symbol}
							</Box>
							<Typography variant="subtitle1" sx={{ color: 'white' }}>
								{button.name}
							</Typography>
						</Box>
						<Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
							{button.description}
						</Typography>
						<Typography
							variant="body2"
							sx={{ mt: 1, color: 'rgba(255,255,255,0.5)', fontStyle: 'italic' }}
						>
							Example: {button.example}
						</Typography>
					</Box>
				</Grid>
			))}
		</Grid>
	</Box>
)

const Tutorial = ({ setSelectedComponent }) => {
  const navigate = useNavigate()
	// Mathematically-oriented buttons (gray)
	const mathButtons = [
		{
			name: 'Operator',
			symbol: '+5',
			description: 'Performs basic math operations on the current result.',
			example: '3 → +5 = 8',
			bgColor: 'rgb(216, 213, 213)',
			textColor: 'rgb(35, 35, 35)',
		},
	]

	// Input manipulation buttons (purple)
	const inputButtons = [
		{
			name: 'Insert',
			symbol: '5',
			description: 'Adds a number to the end of the current result.',
			example: '12 → 5 = 125',
			bgColor: 'rgb(140, 133, 235)',
		},
	]

	// Result-changing buttons (orange)
	const resultChangerButtons = [
		{
			name: 'Transform',
			symbol: '2→5',
			description: 'Replaces all instances of a specific digit with another value.',
			example: '1232 → 2→5 = 1535',
			bgColor: 'rgb(254, 129, 9)',
		},
		{
			name: 'Delete',
			symbol: 'Delete',
			description: 'Removes the last digit from the current result.',
			example: '123 → Delete = 12',
			bgColor: 'rgb(254, 129, 9)',
		},
		{
			name: '+/-',
			symbol: '+/-',
			description: 'Changes the sign of the current result.',
			example: '5 → +/- = -5',
			bgColor: 'rgb(254, 129, 9)',
		},
		{
			name: 'Sum',
			symbol: 'Sum',
			description: 'Adds up all the digits in the current result.',
			example: '1234 → Sum = 10',
			bgColor: 'rgb(254, 129, 9)',
		},
		{
			name: 'Inv10',
			symbol: 'Inv10',
			description: 'Inverts each digit by subtracting it from 10.',
			example: '7890 → Inv10 = 3210',
			bgColor: 'rgb(254, 129, 9)',
		},
	]

	// Order-changing buttons (turquoise)
	const orderChangerButtons = [
		{
			name: 'Sort',
			symbol: 'Sort',
			description: 'Sorts the digits in ascending or descending order.',
			example: '4213 → Sort> = 1234',
			bgColor: 'rgb(24, 148, 156)',
		},
		{
			name: 'Reverse',
			symbol: 'Reverse',
			description: 'Reverses the order of all digits.',
			example: '1234 → Reverse = 4321',
			bgColor: 'rgb(24, 148, 156)',
		},
		{
			name: 'Shift',
			symbol: 'Shift',
			description: 'Shifts all digits left or right by one position.',
			example: '1234 → Shift< = 2341',
			bgColor: 'rgb(24, 148, 156)',
		},
	]

	return (
		<Box sx={{ padding: {xs: 2, md: 3, lg: 4} }}>
			<Typography
				variant="h2"
				sx={{
					fontWeight: 700,
					textAlign: 'center',
					color: 'rgb(76, 167, 213)',
					marginBottom: '1.75rem',
					fontSize: { xs: '2.5rem', sm: '3.5rem', md: '3.75rem' },
					textShadow: '3px 3px 5px rgba(0,0,0,0.2)',
          mb: {xs: 2, md: 3, lg: 4},
				}}
			>
				Tutorial
			</Typography>

			{/* Sections */}
			<Section title="How to Play" emoji="🎮">
				Each level gives you a starting number, a target number, and some buttons to work with. Your
				job is to hit the target by using those buttons — but you only get a limited number of
				moves, so think it through!
				<Box component="div" sx={{ mt: 3 }}>
					<ol>
						<li>Check your starting number and the target</li>
						<li>Think about which buttons might help you get there</li>
						<li>Try them out and see how your number changes</li>
						<li>Reach the target within the move limit to win!</li>
					</ol>
				</Box>
			</Section>

			<Section title="Button Types" emoji="🔘">
				These are the different types of buttons you'll encounter in the game:
				<Box sx={{ mt: 3 }}>
					<ButtonSection title="Mathematical Operation Buttons" buttons={mathButtons} />
					<ButtonSection title="Number Input Buttons" buttons={inputButtons} />
					<ButtonSection title="Result Modification Buttons" buttons={resultChangerButtons} />
					<ButtonSection title="Digit Reordering Buttons" buttons={orderChangerButtons} />
				</Box>
			</Section>

			<Section title="Try Out Some Demo Levels" emoji="🧪">
				Want to see how the game works? These demo levels go from easy to tough and let you mess
				around with the buttons. Try them out here:
				<Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 2 }}>
					<Button
						variant="contained"
						sx={{
							backgroundColor: 'rgb(102, 187, 106)',
							'&:hover': { backgroundColor: 'rgb(56, 142, 60)' },
						}}
						startIcon={<PlayArrow />}
						onClick={() => navigate('/play/66d485ccb0e73cc0e61b81b2')}
					>
						Easy Level
					</Button>
					<Button
						variant="contained"
						sx={{
							backgroundColor: 'rgb(250, 155, 0)',
							'&:hover': { backgroundColor: 'rgb(245, 124, 0)' },
						}}
						startIcon={<PlayArrow />}
						onClick={() => navigate('/play/66cde2e37118765121a64774')}
					>
						Medium Level
					</Button>
					<Button
						variant="contained"
						color="error"
						onClick={() => navigate('/play/66df4af7cc5b12df18a1f300')}
						startIcon={<PlayArrow />}
					>
						Hard Level
					</Button>
				</Box>
			</Section>

			<Section title="Build Your Own Level" emoji="🛠️">
				Feeling creative? Head into the Level Creator to build your own challenges:
				<Box component="div" sx={{ mt: 3 }}>
					<ol style={{ color: 'rgba(255,255,255,0.9)' }}>
						<li>Choose a starting number and target number</li>
						<li>Set your move limit</li>
						<li>Select which buttons to include</li>
						<li>Test your level to make sure it's solvable</li>
						<li>Share it with friends using a unique link</li>
					</ol>
				</Box>
				<Box sx={{ mt: 3, textAlign: 'center' }}>
					<Button
						variant="contained"
						color="primary"
						startIcon={<Create />}
						onClick={() => setSelectedComponent('levelCreator')}
					>
						Create a Level
					</Button>
				</Box>
			</Section>
		</Box>
	)
}

export default Tutorial
