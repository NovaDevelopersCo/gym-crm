import { FC } from 'react'

import { Button } from '@/shared'
import { IStaff, useDeleteStaffMutation } from '@/store'
import { ButtonProps } from 'antd'

type DeleteStaffBtnProps = {
	staffId: IStaff['id']
} & ButtonProps

const DeleteStaffBtn: FC<DeleteStaffBtnProps> = ({ staffId, ...props }) => {
	const [deleteStaff] = useDeleteStaffMutation()

	return (
		<Button
			onClick={() => deleteStaff(staffId)}
			{...props}
			danger
			type='primary'
		>
			Удалить
		</Button>
	)
}

export default DeleteStaffBtn
