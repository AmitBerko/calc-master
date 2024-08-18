import React, { useState } from 'react'
import TypesModal from './modals/TypesModal'
import Calculator from './Calculator'
import { Box, Button, Grid } from '@mui/material'
import LevelSettingsModal from './modals/LevelSettingsModal'
import { useLevelCreator } from './LevelCreatorProvider'
import DeleteButtonModal from './modals/DeleteButtonModal'
import UploadLevelConfirmModal from './modals/UploadLevelConfirmModal'
import LevelCreator from './LevelCreator'

function GameScreen({ levelId }) {
	// const [levelData, setLevelData] = useState({
	// 	_id: '66c2509112c64758ae736c8b',
	// 	buttons: [
	// 		{
	// 			text: '3',
	// 			color: 'insert',
	// 			type: 'insert',
	// 			buttonData: { value: 3 },
	// 			_id: '66c2509112c64758ae736c8c',
	// 		},
	// 		{
	// 			text: 'Inv10',
	// 			color: 'result-changer',
	// 			type: 'inv10',
	// 			buttonData: { operator: '+', value: 5 },
	// 			_id: '66c2509112c64758ae736c8d',
	// 		},
	// 		{ _id: '66c2509112c64758ae736c8e' },
	// 		{ _id: '66c2509112c64758ae736c8f' },
	// 		{ _id: '66c2509112c64758ae736c90' },
	// 		{ _id: '66c2509112c64758ae736c91' },
	// 		{ _id: '66c2509112c64758ae736c92' },
	// 		{ _id: '66c2509112c64758ae736c93' },
	// 	],
	// 	originalSettings: {
	// 		result: 4,
	// 		goal: 63,
	// 		moves: 3,
	// 		_id: '66c2509112c64758ae736c94',
	// 	},
	// 	currentSettings: {
	// 		result: 4,
	// 		goal: 63,
	// 		moves: 3,
	// 		_id: '66c2509112c64758ae736c95',
	// 	},
	// 	__v: 0,
	// })

	return (
		<>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					width: '100%',
					height: { xs: 'calc(100% - 12px)' },
					marginTop: { xs: 1.5, sm: 0 },
					justifyContent: { xs: 'center', sm: 'center' },
				}}
			>
				<LevelCreator />
				{/* <Calculator levelData={levelData} setLevelData={setLevelData} /> */}
			</Box>
		</>
	)
}

export default GameScreen
