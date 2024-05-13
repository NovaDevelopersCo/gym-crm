import type { Dispatch, SetStateAction } from 'react'
import type { ControllerRenderProps } from 'react-hook-form'

import type { TOption } from '@/shared'
import type { SelectProps } from 'antd/es/select'

type TSelectOption = Omit<TOption, 'value'> & {
	value: unknown
}

type TSelectControl = {
	value?: TSelectOption | TSelectOption[]
	setValue?: Dispatch<SetStateAction<TSelectOption | TSelectOption[]>>
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	field?: ControllerRenderProps<any, any>
}

type TSelectProps = Omit<
	SelectProps<TSelectOption['value'], TSelectOption>,
	'value' | 'popupClassName'
> &
	TSelectControl & {
		bodyClassName?: string
	}

export type { TSelectControl, TSelectOption, TSelectProps }
