import { FC, useState } from 'react'

import { Button } from '@/shared'
import { IClub } from '@/store'

import { AddClubModal } from '@entities/AddClubModal'

const EditClubBtn: FC<{
	clubId: IClub['id']
	// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
}> = _props => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

	return (
		<>
			<Button onClick={() => setIsModalOpen(true)}>Edit</Button>
			<AddClubModal
				isModalOpen={isModalOpen}
				setIsModalOpen={setIsModalOpen}
			/>
		</>
	)
}

export default EditClubBtn
