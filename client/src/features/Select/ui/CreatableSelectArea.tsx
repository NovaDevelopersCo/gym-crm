import { CreatableSelect } from "@shared/ui"
import { paramsApi, useGetAreasQuery, useAppDispatch } from "@/store"
import { FC } from 'react'
import { TSelectProps } from "../model"

const CreatableSelectArea: FC<TSelectProps> = (props) => {
	const { data: areas } = useGetAreasQuery('')
	const dispatch = useAppDispatch()
	const onCreateHandler = (inputValue: string) => {
		dispatch(paramsApi.endpoints.createArea.initiate(inputValue))
	}
	return (
		<CreatableSelect label="Создать новое направление" {...props} options={areas} onCreateOption={onCreateHandler} />
	)
}

export default CreatableSelectArea