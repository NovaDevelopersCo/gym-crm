import { FC } from 'react'

import { Select, Spinner, TSelectProps } from '@/shared'
import { useGetClubsQuery } from '@/store'

import { clubsToParams } from '../lib'

const SelectClub: FC<Omit<TSelectProps, 'options'>> = props => {
	const { data: clubs, isLoading } = useGetClubsQuery()
	if (isLoading) return <Spinner />
	return <Select {...props} options={clubsToParams(clubs!.items)} />
}

export default SelectClub
