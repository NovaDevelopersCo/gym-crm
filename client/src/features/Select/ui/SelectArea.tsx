import { FC } from 'react'

import { Select, TSelectOption, TSelectProps } from '@/shared'
import { useGetAreasQuery } from '@/store'

const SelectArea: FC<Omit<TSelectProps, 'options'>> = props => {
	const { data: areas } = useGetAreasQuery()
	const convertedAreasToParams: TSelectOption[] | undefined = areas?.map(
		area =>
			({
				label: area.name,
				value: area
			}) as TSelectOption
	)

	return <Select {...props} options={convertedAreasToParams} />
}

export default SelectArea
