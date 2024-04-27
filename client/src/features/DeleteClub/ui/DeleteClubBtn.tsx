import { FC } from 'react'

import { Button } from '@/shared'
import { IClub, useDeleteClubMutation } from '@/store'

const DeleteClubBtn: FC<{
	clubId: IClub['id']
}> = ({ clubId }) => {
	const [deleteClub] = useDeleteClubMutation()
	return <Button onClick={() => deleteClub(clubId)}>Delete</Button>
}

export default DeleteClubBtn
