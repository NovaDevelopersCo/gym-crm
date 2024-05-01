import { Modal } from '@/shared'

import cl from './EditGroupModal.module.scss'

export const EditGroupModal = ({
	isModalOpen,
	setIsModalOpen
}: {
	isModalOpen: boolean
	setIsModalOpen: () => void
}) => {
	return (
		<Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
			<form className={cl.root}>
				<h2 className={cl.root__title}>Edit Group</h2>
			</form>
		</Modal>
	)
}
