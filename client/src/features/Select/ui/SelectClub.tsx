import { FC } from 'react'

import { Select, TSelectOption, TSelectProps } from '@/shared'
import { useGetClubsQuery } from '@/store'

const SelectClub: FC<Omit<TSelectProps, 'options'>> = props => {
	const { data: clubs } = useGetClubsQuery()
	const convertedClubsToParams: TSelectOption[] | undefined =
		clubs?.items?.map(
			club =>
				({
					label: club.name,
					value: club
				}) as TSelectOption
		)
	return <Select {...props} options={convertedClubsToParams} />
}

export default SelectClub
