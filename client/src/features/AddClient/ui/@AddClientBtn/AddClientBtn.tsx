import { useState } from 'react'

import { Button, Modal } from '@/shared'

import Form from '../@AddClientModal/Form'

const AddClientBtn = () => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
	return (
		<>
			<Button
				size='large'
				onClick={() => setIsModalOpen(true)}
				className=''
			>
				Добавить анкету
			</Button>

			<Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
				<Form />
			</Modal>
		</>
	)
}

export default AddClientBtn
