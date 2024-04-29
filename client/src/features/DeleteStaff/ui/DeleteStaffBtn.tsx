import { IStaff } from "@/store"
import { Button } from "antd"
import { FC } from "react"

const DeleteStaffBtn: FC<{ staffId: IStaff['id'] }> = ({ staffId }) => {

	const handleDelete = (id: string | number) => {
		console.log(`Delete staff with id: ${id}`)
	}

	return (
		<Button onClick={() => handleDelete(staffId)}>Delete</Button>
	)
}

export default DeleteStaffBtn