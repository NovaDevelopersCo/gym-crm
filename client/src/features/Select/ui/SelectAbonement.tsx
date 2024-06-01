import { FC } from 'react'

import { Select, Spinner, TSelectProps } from '@/shared'
import { useGetAbonementsQuery } from '@/store'

import { abonementsToParams } from '../lib'

const SelectAbonement: FC<Omit<TSelectProps, 'options'>> = props => {
	const { data: clubs, isLoading } = useGetAbonementsQuery()
	if (isLoading) return <Spinner />
	return <Select {...props} options={abonementsToParams(clubs!.items)} />
}

export default SelectAbonement
