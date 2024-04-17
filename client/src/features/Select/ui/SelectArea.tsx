import { FC } from 'react'

import { Select } from '@/shared'
import { useGetAreasQuery } from '@/store'

import { TSelectProps } from '../model'

const SelectArea: FC<TSelectProps> = props => {
	const { data: areas } = useGetAreasQuery()
	return <Select {...props} options={areas} />
}

export default SelectArea
