import { FC } from 'react'

import { Button } from '@/shared'
import { IDirection, useDeleteDirectionMutation } from '@/store'
import { ButtonProps } from 'antd'

type DeleteDirectionBtnProps = {
	directionId: IDirection['id']
} & ButtonProps

const DeleteDirectionBtn: FC<DeleteDirectionBtnProps> = ({ directionId, ...props }) => {
	const [deleteDirection] = useDeleteDirectionMutation()

	return <Button onClick={() => deleteDirection(directionId)} {...props} danger type="primary">Удалить</Button>
}

export default DeleteDirectionBtn
