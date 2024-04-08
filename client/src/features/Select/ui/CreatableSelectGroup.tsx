import { FC, useMemo } from 'react'

import { EStuffRoles, paramsApi, useAppDispatch, useGetGroupsQuery } from '@store/index'

import { CreatableSelect, Select } from '@shared/ui'

import { TSelectProps } from '../model'

const CreatableSelectGroup: FC<TSelectProps> = props => {
	const dispatch = useAppDispatch()
	const { data: groups } = useGetGroupsQuery()
	const options = useMemo(
		() =>
			groups?.items.map(val => ({
				label: val.name,
				value: val.id
			})),
		[groups]
	)
	const onCreateHandler = (inputValue: string) => {
		dispatch(paramsApi.endpoints.createGroup.initiate({
			name: inputValue,
			club: '',
			direction: '',
			trainer: {
				email: '',
				fio: '',
				id: 0,
				role: EStuffRoles.TRAINER
			},
		}))
	}
	return (
		<CreatableSelect
			options={options}
			placeholder='Группы'
			onCreateOption={onCreateHandler}
			createPlaceholder='Создать новую группу'
			mode='multiple'
			{...props}
		>
			<>
				trainer
				direction
				club
			</>
		</CreatableSelect>
	)
}

export default CreatableSelectGroup
