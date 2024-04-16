import { FC } from 'react'

import { Select } from '@/shared'

import { useGetGroupsQuery } from '@store/index'

import { TSelectProps } from '../model'

const SelectGroup: FC<TSelectProps> = props => {
	const { data: areas } = useGetGroupsQuery()
	return <Select {...props} options={areas} />
}

export default SelectGroup
