import { FC, useState } from 'react'

import { Button } from '@/shared'
import { ButtonProps } from 'antd'

import AddClubModal from './@AddClubModal/AddClubModal'

const AddClubBtn: FC<ButtonProps> = props => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

	return (
		<>
			<Button
				{...props}
				onClick={() => setIsModalOpen(true)}
			>
				Добавить клуб
			</Button>
			<AddClubModal
				isModalOpen={isModalOpen}
				setIsModalOpen={setIsModalOpen}
			/>
		</>
	)
}

export default AddClubBtn
