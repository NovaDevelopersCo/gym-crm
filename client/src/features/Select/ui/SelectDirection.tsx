import { FC } from 'react'

import { Select, TSelectOption, TSelectProps } from '@/shared'
import { useGetDirectionsQuery } from '@/store'

const SelectDirection: FC<Omit<TSelectProps, 'options'>> = props => {
	const { data: directions } = useGetDirectionsQuery()
	const convertedDirectionsToParams: TSelectOption[] | undefined =
		directions?.items?.map(
			direction =>
				({
					label: direction.name,
					value: direction.id
				}) as TSelectOption
		)

	return <Select {...props} options={convertedDirectionsToParams} />
}

export default SelectDirection
