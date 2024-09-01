import React from 'react'
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'

function DrawerItem({ text, icon: Icon, onClick, isSelected }) {
	return (
		<>
			<ListItem key={text} disablePadding onClick={onClick}>
				<ListItemButton
					selected={isSelected}
					sx={{
						paddingTop: '0.75rem',
						paddingBottom: '0.75rem',
						'&.Mui-selected': {
							backgroundColor: 'rgba(255, 255, 255, 0.08)',
							'&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.12)' },
						},
						'&:hover': {
							backgroundColor: 'rgba(255, 255, 255, 0.04)',
						},
					}}
				>
					<ListItemIcon sx={{ minWidth: '2.5rem' }}>
						<Icon sx={{ color: 'rgb(230, 230, 230)' }} />
					</ListItemIcon>
					<ListItemText
						primary={text}
						primaryTypographyProps={{
							fontWeight: isSelected ? '500' : 'normal',
							color: isSelected ? 'rgb(255, 255, 255)' : 'rgb(200, 200, 200)',
						}}
					/>
				</ListItemButton>
			</ListItem>
		</>
	)
}

export default DrawerItem
