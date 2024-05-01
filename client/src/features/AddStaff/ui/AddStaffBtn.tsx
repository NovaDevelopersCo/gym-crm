import { ButtonProps } from 'antd'
import { FC, useState } from 'react'
import AddStaffModal from './@AddStaffModal/AddStaffModal'
import { Button } from '@/shared'

const AddStaffBtn: FC<Omit<ButtonProps, 'onClick'>> = (props) => {
	const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

	return (
		<>
			<Button onClick={() => setIsModalVisible(true)} className='' {...props}>
				Добавить персонал
			</Button>
			<AddStaffModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
		</>
	)
}

export default AddStaffBtn