import { FC } from 'react'

import { Select } from '@/shared'

import { useGetLocationsQuery } from '@store/index'

import { TSelectProps } from '../model'

const SelectLocation: FC<TSelectProps> = props => {
	const { data: areas } = useGetLocationsQuery()
	return <Select {...props} options={areas} />
}

export default SelectLocation
