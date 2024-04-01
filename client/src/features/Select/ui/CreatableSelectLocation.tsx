import { FC } from "react"
import TSelectProps from "../model/SelectProps.type"
import { CreatableSelect } from "@shared/ui"
import { paramsApi, useAppDispatch, useGetLocationsQuery } from "@store/index"

const CreatableSelectLocation: FC<TSelectProps> = (props) => {
	const { data: areas } = useGetLocationsQuery('')
	const dispatch = useAppDispatch()
	const onCreateHandler = (inputValue: string) => {
		dispatch(paramsApi.endpoints.createLocation.initiate(inputValue))
	}
	return (
		<CreatableSelect label="Создать новую локацию" {...props} options={areas} onCreateOption={onCreateHandler} />
	)
}

export default CreatableSelectLocation