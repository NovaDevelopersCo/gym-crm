import { FC, useMemo } from 'react'

import { paramsApi, useAppDispatch, useGetDirectionsQuery } from '@/store'

import { CreatableSelect } from '@shared/ui'

import { TSelectProps } from '../model'

const CreatableSelectDirection: FC<TSelectProps> = props => {
	const dispatch = useAppDispatch()
	const { data: areas } = useGetDirectionsQuery()
	const options = useMemo(
		() =>
			areas?.items.map(val => ({
				label: val.name,
				value: val.id
			})),
		[areas]
	)
	const onCreateHandler = (inputValue: string) => {
		dispatch(paramsApi.endpoints.createDirection.initiate({ name: inputValue }))
	}
	return (
		<CreatableSelect
			options={options}
			placeholder='Направление'
			onCreateOption={onCreateHandler}
			createPlaceholder={'Создать новое направление'}
			mode='multiple'
			{...props}
		/>
	)
}

export default CreatableSelectDirection
