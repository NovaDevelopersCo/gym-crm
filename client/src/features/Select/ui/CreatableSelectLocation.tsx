import { FC } from 'react'

import { paramsApi, useAppDispatch, useGetLocationsQuery } from '@store/index'

import { CreatableSelect } from '@shared/ui'

// eslint-disable-next-line import/no-internal-modules
import TSelectProps from '../model/SelectProps.type'

const CreatableSelectLocation: FC<TSelectProps> = props => {
	const { data: areas } = useGetLocationsQuery('')
	const dispatch = useAppDispatch()
	const onCreateHandler = (inputValue: string) => {
		dispatch(paramsApi.endpoints.createLocation.initiate(inputValue))
	}
	return (
		<CreatableSelect
			label='Создать новую локацию'
			{...props}
			options={areas}
			onCreateOption={onCreateHandler}
		/>
	)
}

export default CreatableSelectLocation
