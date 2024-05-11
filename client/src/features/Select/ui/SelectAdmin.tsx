import { FC } from 'react'

import { Select, TSelectProps } from '@/shared'
import { useGetStaffQuery } from '@/store'
import { staffsToParams } from '../lib'

const SelectAdmin: FC<Omit<TSelectProps, 'options'>> = props => {
	const { data: staffs } = useGetStaffQuery()
	return <Select {...props} options={staffsToParams(staffs!)} />
}

export default SelectAdmin
