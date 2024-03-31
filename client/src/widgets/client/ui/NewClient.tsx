import { useState } from 'react'

import { Button, Modal } from '@/shared'

import { Form } from './form'

const NewClient = () => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

	return (
		<div>
			<Button size='large' onClick={() => setIsModalOpen(true)}>
				Добавить анкету
			</Button>
			<Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
				<Form />
			</Modal>
		</div>
	)
}

export default NewClient
