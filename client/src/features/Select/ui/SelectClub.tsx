import { FC } from 'react'

import { Select, TSelectProps } from '@/shared'
import { useGetClubsQuery } from '@/store'

import { clubsToParams } from '../lib'

const SelectClub: FC<Omit<TSelectProps, 'options'>> = props => {
	const { data: clubs } = useGetClubsQuery()
	return <Select {...props} options={clubsToParams(clubs!)} />
}

export default SelectClub
