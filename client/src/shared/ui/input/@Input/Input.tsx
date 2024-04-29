import { type FC, useId } from 'react'
import type { ControllerRenderProps, FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'

import { Input as AntdInput, type InputProps } from 'antd'
import clsx from 'clsx'

import cl from './../index.module.scss'

export type TInputProps = InputProps & {
	label?: string
	error?: string | FieldError | Merge<FieldError, FieldErrorsImpl>
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	field?: ControllerRenderProps<any, any>
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
