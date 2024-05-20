import { FC } from 'react'

import { Select, Spinner, TSelectProps } from '@/shared'
import { useGetGroupsQuery } from '@/store'

import { groupsToParams } from '../lib'

const SelectGroup: FC<Omit<TSelectProps, 'options'>> = props => {
	const { data: groups, isLoading } = useGetGroupsQuery()
	if (isLoading) return <Spinner />
	return <Select {...props} options={groupsToParams(groups!.items)} />
}

export default SelectGroup
