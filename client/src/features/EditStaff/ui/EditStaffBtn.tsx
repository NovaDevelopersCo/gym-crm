import { Button } from '@/shared'
import { IStaff } from '@/store'
import { ButtonProps } from 'antd'
import { FC } from 'react'

type EditStaffBtnProps = {
	staffId: IStaff['id']
} & ButtonProps

const EditStaffBtn: FC<EditStaffBtnProps> = ({ staffId, ...props }) => {
	return (
		<Button onClick={() => console.log(`Edit staff with id: ${staffId}`)} type="dashed" className=''
			{...props}>Изменить</Button>
	)
}

export default EditStaffBtn