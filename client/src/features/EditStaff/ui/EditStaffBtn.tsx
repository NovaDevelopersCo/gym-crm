import { FC, useState } from 'react'

import { Button } from '@/shared'
import { IStaff } from '@/store'
import { ButtonProps } from 'antd'

import EditStaffModal from './@EditStaffModal/EditStaffModal'

type EditStaffBtnProps = {
	staffId: IStaff['id']
} & ButtonProps

const EditStaffBtn: FC<EditStaffBtnProps> = ({ staffId, ...props }) => {
	const [isModal, setIsModal] = useState<boolean>(false)

	return (
		<>
			<Button
				onClick={() => setIsModal(true)}
				type='dashed'
				className=''
				{...props}
			>
				Изменить
			</Button>
			<EditStaffModal
				isModalVisible={isModal}
				setIsModalVisible={setIsModal}
				staffId={staffId}
			/>
		</>
	)
}

export default EditStaffBtn
