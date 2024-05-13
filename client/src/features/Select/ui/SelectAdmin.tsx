import { FC } from 'react'

import { Select, Spinner, TSelectProps } from '@/shared'
import { useGetStaffQuery } from '@/store'

import { staffsToParams } from '../lib'

const SelectAdmin: FC<Omit<TSelectProps, 'options'>> = props => {
	const { data: staffs, isLoading } = useGetStaffQuery()
	if (isLoading) return <Spinner />
	return <Select {...props} options={staffsToParams(staffs!.items)} />
}

export default SelectAdmin
