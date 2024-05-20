import { FC } from 'react'

import { Select, Spinner, TSelectProps } from '@/shared'
import { useGetDirectionsQuery } from '@/store'

import { directionsToParams } from '../lib'

const SelectDirection: FC<Omit<TSelectProps, 'options'>> = props => {
	const { data: directions, isLoading } = useGetDirectionsQuery()
	if (isLoading) return <Spinner />
	return <Select {...props} options={directionsToParams(directions!.items)} />
}

export default SelectDirection
