import { FC, useState } from 'react'

import { Button } from '@/shared'
import { ButtonProps } from 'antd'

import AddStaffModal from './@AddStaffModal/AddStaffModal'

const AddStaffBtn: FC<Omit<ButtonProps, 'onClick'>> = props => {
	const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

	return (
		<>
			<Button
				onClick={() => setIsModalVisible(true)}
				className=''
				{...props}
			>
				Добавить персонал
			</Button>
			<AddStaffModal
				isModalVisible={isModalVisible}
				setIsModalVisible={setIsModalVisible}
			/>
		</>
	)
}

export default AddStaffBtn
