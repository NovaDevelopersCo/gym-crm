import { FC } from 'react'

import { paramsApi, useAppDispatch, useGetAreasQuery } from '@/store'

import { CreatableSelect } from '@shared/ui'

import { TSelectProps } from '../model'

const CreatableSelectArea: FC<TSelectProps> = props => {
	const { data: areas } = useGetAreasQuery('')
	const dispatch = useAppDispatch()
	const onCreateHandler = (inputValue: string) => {
		dispatch(paramsApi.endpoints.createArea.initiate(inputValue))
	}
	return (
		<CreatableSelect
			label='Создать новое направление'
			{...props}
			options={areas}
			onCreateOption={onCreateHandler}
		/>
	)
}

export default CreatableSelectArea
