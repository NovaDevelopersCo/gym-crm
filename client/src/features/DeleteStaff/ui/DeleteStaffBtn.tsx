import { IStaff, useDeleteStaffMutation } from "@/store"
import { ButtonProps } from "antd"
import { FC } from "react"
import { Button } from '@/shared';

type DeleteStaffBtnProps = {
	staffId: IStaff['id']
} & ButtonProps

const DeleteStaffBtn: FC<DeleteStaffBtnProps> = ({ staffId, ...props }) => {
	const [deleteStaff,] = useDeleteStaffMutation()

	return (
		<Button onClick={() => deleteStaff(staffId)} {...props} danger type="primary">Удалить</Button>
	)
}

export default DeleteStaffBtn