import { createTheme, outlinedInputClasses } from '@mui/material'

const theme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: '#0280c7',
		},
		secondary: {
			main: 'rgb(200, 200, 200)',
		},
		background: {
			default: 'rgb(50, 50, 52)',
		},
		text: {
			primary: 'rgba(255,255,255,0.85)',
			secondary: 'rgba(200,200,200,0.85)',
		},
	},
	components: {
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					backgroundColor: 'rgb(65, 65, 65)',
					'& .MuiOutlinedInput-notchedOutline': {
						borderColor: 'rgb(39, 39, 39)', // Border color
					},
					'&:hover .MuiOutlinedInput-notchedOutline': {
						borderColor: 'rgb(200, 200, 200)', // Hover border color
					},
				},
			},
		},
    MuiButton: {
      styleOverrides: {
        root: {

          borderRadius: '0.75rem'
        }
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginTop: "0.4rem",
        }
      },
    },
	},
})

export default theme
