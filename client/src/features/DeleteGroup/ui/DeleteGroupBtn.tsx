import { FC } from 'react'

import { type IGroup, useDeleteGroupMutation } from '@/store'
import { Button } from 'antd'

export const DeleteGroupBtn: FC<{ groupId: IGroup['id'] }> = ({ groupId }) => {
	const [deleteGroup] = useDeleteGroupMutation()

	return (
		<Button danger onClick={() => deleteGroup(groupId)} type='primary'>
			Удалить
		</Button>
	)
}
