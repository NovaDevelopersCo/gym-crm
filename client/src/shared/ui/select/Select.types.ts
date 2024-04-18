import type { Dispatch, SetStateAction } from 'react'
import type { ControllerRenderProps, FieldValues } from 'react-hook-form'

import type { TOption } from '@/shared'
import type { SelectProps } from 'antd/es/select'

type TSelectOption = Omit<TOption, 'value'> & {
	value: unknown
}

type TSelectControll = {
	value?: TSelectOption | TSelectOption[]
	setValue?: Dispatch<SetStateAction<TSelectOption | TSelectOption[]>>
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	field?: ControllerRenderProps<FieldValues, any>
}

type TSelectProps = Omit<
	SelectProps<TSelectOption['value'], TSelectOption>,
	'value' | 'popupClassName'
> &
	TSelectControll & {
		bodyClassName?: string
	}

export type { TSelectControll, TSelectOption, TSelectProps }
