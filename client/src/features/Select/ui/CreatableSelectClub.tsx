import { FC, useMemo } from 'react'

import { paramsApi, useAppDispatch, useGetClubsQuery } from '@store/index'

import { CreatableSelect } from '@shared/ui'

import { TSelectProps } from '../model'

const CreatableSelectClub: FC<TSelectProps> = props => {
	const dispatch = useAppDispatch()
	const { data: locations } = useGetClubsQuery()
	const options = useMemo(
		() =>
			locations?.items.map(val => ({
				label: val.name,
				value: val.id
			})),
		[locations]
	)
	const onCreateHandler = (inputValue: string) => {
		dispatch(
			paramsApi.endpoints.createClub.initiate({
				name: inputValue,
				admin: { id: 0 },
				address: ''
			})
		)
	}
	return (
		<CreatableSelect
			options={options}
			placeholder='Локации'
			onCreateOption={onCreateHandler}
			createPlaceholder='Создать новую локацию'
			mode='multiple'
			{...props}
		>
			<>
				admin
				address
			</>
		</CreatableSelect>
	)
}

export default CreatableSelectClub
