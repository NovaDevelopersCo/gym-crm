import { FC } from 'react'

import { Select, TSelectProps } from '@/shared'
import { useGetGroupsQuery } from '@/store'
import { groupsToParams } from '../lib'

const SelectGroup: FC<Omit<TSelectProps, 'options'>> = props => {
	const { data: groups } = useGetGroupsQuery()
	return <Select {...props} options={groupsToParams(groups!)} />
}

export default SelectGroup