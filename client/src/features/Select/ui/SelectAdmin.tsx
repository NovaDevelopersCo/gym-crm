import { FC } from 'react'

import { Select, TSelectOption, TSelectProps } from '@/shared'
import { useGetStaffQuery } from '@/store'

const SelectAdmin: FC<Omit<TSelectProps, 'options'>> = props => {
	const { data: staffs } = useGetStaffQuery()
	const convertedStaffToParams: TSelectOption[] | undefined =
		staffs?.items?.map(
			staff =>
				({
					label: staff.email,
					value: staff.id
				}) as TSelectOption
		)
	return <Select {...props} options={convertedStaffToParams} />
}

export default SelectAdmin
