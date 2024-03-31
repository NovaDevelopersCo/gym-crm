import type { ChangeEvent, FC } from 'react'
import type { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'

import { Input as AntdInput, type InputProps, Typography } from 'antd'
import clsx from 'clsx'

import cl from './Input.module.scss'

type TInputProps = InputProps & {
	label: string
	error?: string | FieldError | Merge<FieldError, FieldErrorsImpl>
	field: {
		onChange: (e: ChangeEvent<HTMLInputElement>) => void // eslint-disable-line no-unused-vars
		value: string | string[] | number
	}
	bodyClassName?: string
}

const Input: FC<TInputProps> = ({
	label,
	error,
	field,
	bodyClassName,
	...props
}) => {
	return (
		<div className={bodyClassName ?? ''}>
			<label className={cl.root__label}>{label}</label>
			<AntdInput
				{...field}
				{...props}
				className={clsx(
					cl.root__input,
					error ? cl.root__input_inputErr : ''
				)}
			/>
		</div>
	)
}

export default Input
