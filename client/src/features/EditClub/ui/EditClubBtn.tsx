import { FC, useState } from 'react'

import { Button } from '@/shared'
import { IClub } from '@/store'
import { ButtonProps } from 'antd'

import EditClubModal from './@EditClubModal/EditClubModal'

type EditClubBtnProps = {
	clubId: IClub['id']
} & ButtonProps

const EditClubBtn: FC<EditClubBtnProps> = ({ clubId, ...props }) => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

	return (
		<>
			<Button
				onClick={() => setIsModalOpen(true)}
				{...props}
				className=''
				type='dashed'
			>
				Изменить
			</Button>
			<EditClubModal
				isModalOpen={isModalOpen}
				setIsModalOpen={setIsModalOpen}
				clubId={clubId}
			/>
		</>
	)
}

export default EditClubBtn
