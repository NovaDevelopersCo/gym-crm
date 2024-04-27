import { FC } from 'react'

import { Button } from '@/shared'
import { IDirection, useDeleteDirectionMutation } from '@/store'

const DeleteDirectionBtn: FC<{
	directionId: IDirection['id']
}> = ({ directionId }) => {
	const [deleteDirection] = useDeleteDirectionMutation()

	return <Button onClick={() => deleteDirection(directionId)}>Delete</Button>
}

export default DeleteDirectionBtn
