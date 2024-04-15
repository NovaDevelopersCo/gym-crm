import { type ChangeEventHandler, type FC, useId } from 'react'
import type { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'

import { Input as AntdInput, type InputProps } from 'antd'
import clsx from 'clsx'

import cl from './../index.module.scss'

type TInputProps = InputProps & {
	label?: string
	error?: string | FieldError | Merge<FieldError, FieldErrorsImpl>
	field: {
		onChange: ChangeEventHandler<HTMLInputElement>
		value: string | string[] | number
	}
	bodyClassName?: string
}

export const Input: FC<TInputProps> = ({
	label,
	error,
	field,
	bodyClassName,
	...props
}) => {
	const id = useId()

	return (
		<div className={bodyClassName ?? ''}>
			{!!label && (
				<label htmlFor={id} className={cl.root__label}>
					{label}
				</label>
			)}
			<AntdInput
				{...field}
				id={id}
				className={clsx(
					cl.root__input,
					error ? cl.root__input_inputErr : ''
				)}
				{...props}
			/>
			<span className={cl.root__input_textErr}>{error?.toString()}</span>
		</div>
	)
}
