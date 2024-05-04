import { FC } from 'react'
import { Button } from '@/shared'
import { ButtonProps } from 'antd'
import { IGroup } from '@/store'

type EditGroupBtnProps = {
	groupId: IGroup['id']
} & ButtonProps

const EditGroupBtn: FC<EditGroupBtnProps> = ({ groupId, ...props }) => {
	return (
		<Button onClick={() => console.log(`Edit group with id: ${groupId}`)} {...props} type="dashed"
		>Изменить</Button>
	)
}

export default EditGroupBtn