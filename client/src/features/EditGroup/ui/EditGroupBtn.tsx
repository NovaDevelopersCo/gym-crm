import { FC, useState } from 'react'

import { Button } from '@/shared'
import { IGroup } from '@/store'
import { ButtonProps } from 'antd'

import { EditGroupModal } from '@entities/EditGroupModal'

type EditGroupBtnProps = {
	groupId: IGroup['id']
} & ButtonProps

const EditGroupBtn: FC<EditGroupBtnProps> = ({ groupId, ...props }) => {
	const [isModalOpen, setIsModalOpen] = useState(false)

	const handleEdit = () => {
		console.log(`Edit group with id: ${groupId}`)
		setIsModalOpen(prev => !prev)
	}

	return (
		<>
			<Button onClick={handleEdit} {...props} type='dashed'>
				Изменить
			</Button>
			<EditGroupModal
				isModalOpen={isModalOpen}
				setIsModalOpen={setIsModalOpen}
			/>
		</>
	)
}

export default EditGroupBtn
