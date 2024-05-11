import { FC } from 'react'

import { Select, TSelectProps } from '@/shared'
import { useGetDirectionsQuery } from '@/store'

import { directionsToParams } from '../lib'

const SelectDirection: FC<Omit<TSelectProps, 'options'>> = props => {
	const { data: directions } = useGetDirectionsQuery()
	return <Select {...props} options={directionsToParams(directions!)} />
}

export default SelectDirection
