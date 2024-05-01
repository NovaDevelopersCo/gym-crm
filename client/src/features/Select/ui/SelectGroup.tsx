import { FC } from 'react'

import { Select, TSelectOption, TSelectProps } from '@/shared'
import { useGetGroupsQuery } from '@/store'

const SelectGroup: FC<Omit<TSelectProps, 'options'>> = props => {
	const { data: groups } = useGetGroupsQuery()
	const convertedGroupsToParams: TSelectOption[] | undefined = groups?.items?.map(
		group =>
			({
				label: group.name,
				value: group.id
			}) as TSelectOption
	)
	return <Select {...props} options={convertedGroupsToParams} />
}

export default SelectGroup
