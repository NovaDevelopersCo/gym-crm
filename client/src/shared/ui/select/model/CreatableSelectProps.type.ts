import { CSSProperties, Dispatch, SetStateAction } from 'react'

import { SelectProps } from 'antd'

import { TOption } from './Option.type'

type TCreatableSelectProps = {
	placeholder: string
	createPlaceholder: string
	options?: TOption[]
	onCreateOption?: (inputValue: string) => void
	value: TOption[]
	setValue: Dispatch<SetStateAction<TOption[]>>
	style?: CSSProperties
	mode?: SelectProps['mode']
}

export type { TCreatableSelectProps }
