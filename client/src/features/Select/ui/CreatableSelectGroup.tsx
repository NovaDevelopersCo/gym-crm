import { FC } from 'react'

import { paramsApi, useAppDispatch, useGetGroupsQuery } from '@store/index'

import { CreatableSelect } from '@shared/ui'

// eslint-disable-next-line import/no-internal-modules
import TSelectProps from '../model/SelectProps.type'

const CreatableSelectGroup: FC<TSelectProps> = props => {
	const { data: areas } = useGetGroupsQuery('')
	const dispatch = useAppDispatch()
	const onCreateHandler = (inputValue: string) => {
		dispatch(paramsApi.endpoints.createGroup.initiate(inputValue))
	}
	return (
		<CreatableSelect
			label='Создать новую группу'
			{...props}
			options={areas}
			onCreateOption={onCreateHandler}
		/>
	)
}

export default CreatableSelectGroup
