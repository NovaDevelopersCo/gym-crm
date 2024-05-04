import { FC } from 'react'

import { Button } from '@/shared'
import { IClub, useDeleteClubMutation } from '@/store'
import { ButtonProps } from 'antd'

type DeleteClubBtnProps = {
	clubId: IClub['id']
} & ButtonProps

const DeleteClubBtn: FC<DeleteClubBtnProps> = ({ clubId, ...props }) => {
	const [deleteClub,] = useDeleteClubMutation()

	return <Button onClick={() => deleteClub(clubId)} {...props} danger type="primary">Удалить</Button>
}

export default DeleteClubBtn
