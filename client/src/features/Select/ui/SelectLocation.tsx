import { FC } from 'react'

import { Select, TSelectOption, TSelectProps } from '@/shared'
import { useGetLocationsQuery } from '@/store'

const SelectLocation: FC<Omit<TSelectProps, 'options'>> = props => {
	const { data: locations } = useGetLocationsQuery()
	const convertedLocationsToParams: TSelectOption[] | undefined =
		locations?.map(
			location =>
				({
					label: location.name,
					value: location
				}) as TSelectOption
		)
	return <Select {...props} options={convertedLocationsToParams} />
}

export default SelectLocation
