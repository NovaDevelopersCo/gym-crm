import { useState } from 'react'

import { Button } from 'antd'

import { EditGroupModal } from '@entities/EditGroupModal'

export const EditGroupBtn = () => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

	return (
		<>
			<Button onClick={() => setIsModalOpen(prev => !prev)}>edit</Button>
			<EditGroupModal
				isModalOpen={isModalOpen}
				setIsModalOpen={setIsModalOpen}
			/>
		</>
	)
}
