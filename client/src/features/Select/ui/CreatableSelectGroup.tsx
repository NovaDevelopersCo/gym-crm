import { CreatableSelect } from "@shared/ui"
import { FC } from "react"
import TSelectProps from "../model/SelectProps.type"
import { paramsApi, useAppDispatch, useGetGroupsQuery } from "@store/index"

const CreatableSelectGroup: FC<TSelectProps> = (props) => {
	const { data: areas } = useGetGroupsQuery('')
	const dispatch = useAppDispatch()
	const onCreateHandler = (inputValue: string) => {
		dispatch(paramsApi.endpoints.createGroup.initiate(inputValue))
	}
	return (
		<CreatableSelect label="Создать новую группу" {...props} options={areas} onCreateOption={onCreateHandler} />
	)
}

export default CreatableSelectGroup