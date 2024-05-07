import { FC } from 'react'

import { Button } from '@/shared'
import { IGroup } from '@/store'
import { ButtonProps } from 'antd'

type EditGroupBtnProps = {
	groupId: IGroup['id']
} & ButtonProps

const EditGroupBtn: FC<EditGroupBtnProps> = ({ groupId, ...props }) => {
	return (
		<Button
			onClick={() => console.log(`Edit group with id: ${groupId}`)}
			{...props}
			type='dashed'
		>
			Изменить
		</Button>
	)
}

export default EditGroupBtn
