import React from 'react'
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'

function DrawerItem({ text, icon: Icon, onClick }) {
	return (
		<>
			<ListItem key={text} disablePadding onClick={onClick}>
				<ListItemButton sx={{ paddingTop: '0.75rem', paddingBottom: '0.75rem' }}>
					<ListItemIcon sx={{ minWidth: '2.5rem' }}>
						<Icon sx={{ color: 'rgb(230, 230, 230)' }} />
					</ListItemIcon>
					<ListItemText primary={text} />
				</ListItemButton>
			</ListItem>
		</>
	)
}

export default DrawerItem
