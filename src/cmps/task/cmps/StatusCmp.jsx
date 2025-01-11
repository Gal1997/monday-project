import React, { useState } from 'react'

export function StatusCmp({ onUpdate, board, info }) {
	const [modal, setModal] = useState(false) 

	const currentLabel = board?.labels?.find((label) => label.id === info)
	const style = { backgroundColor: currentLabel?.color || '#ccc', width: '100%', height: '100%' }
	const statusLabels = board?.labels?.filter((label) => label.id[1] === '1') // Status labels start with `l1`

	function handleLabelClick(label) {
		onUpdate(label.id)
		setModal(false)
	}

	const handleOutsideClick = () => {
		setModal(false)
	}

	return (
		<div style={style} onClick={() => setModal(true)}>
			{currentLabel?.title || 'Set Status'}

			{modal && (
				<div className='modal-backdrop' onClick={handleOutsideClick} style={{ zIndex: 1000 }}>
					<div className='modal' onClick={(e) => e.stopPropagation()} style={{ zIndex: 1001 }}>
						<h3>Choose a Status</h3>
						<div className='label-list'>
							{statusLabels.map((label) => (
								<div
									key={label.id}
									className='label-box'
									onClick={() => handleLabelClick(label)}
									style={{
										backgroundColor: label.color,
									}}>
									{label.title}
								</div>
							))}
						</div>
					</div>
				</div>
			)}
		</div>
	)
}
