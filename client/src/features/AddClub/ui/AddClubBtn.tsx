import { FC, useState } from 'react'

import { Button } from '@/shared'
import { ButtonProps } from 'antd'

import { AddClubModal } from '@entities/AddClubModal'

const AddClubBtn: FC<ButtonProps> = props => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

	return (
		<>
			<Button
				{...props}
				// className={cl.root__button}
				onClick={() => setIsModalOpen(true)}
			>
				Add Club
			</Button>
			<AddClubModal
				isModalOpen={isModalOpen}
				setIsModalOpen={setIsModalOpen}
			/>
		</>
	)
}

export default AddClubBtn
