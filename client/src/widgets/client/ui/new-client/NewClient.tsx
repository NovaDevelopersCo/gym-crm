import { useState } from 'react'

import { Button, Modal } from '@/shared'

const NewClient = () => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

	return (
		<div>
			<Button
				text='New client'
				type='button'
				onClick={() => setIsModalOpen(true)}
			/>
			<Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
				modal
			</Modal>
		</div>
	)
}

export default NewClient
