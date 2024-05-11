import { FC, useState } from 'react'

import { Button } from '@/shared'
import { IGroup } from '@/store'
import { ButtonProps } from 'antd'

import { EditGroupModal } from './@EditGroupModal/EditGroupModal'

type EditGroupBtnProps = {
	groupId: IGroup['id']
} & ButtonProps

const EditGroupBtn: FC<EditGroupBtnProps> = ({ groupId, ...props }) => {
	const [isModalOpen, setIsModalOpen] = useState(false)

	return (
		<>
			<Button
				onClick={() => setIsModalOpen(true)}
				{...props}
				type='dashed'
			>
				Изменить
			</Button>
			<EditGroupModal
				isModalOpen={isModalOpen}
				setIsModalOpen={setIsModalOpen}
				groupId={groupId}
			/>
		</>
	)
}

export default EditGroupBtn
