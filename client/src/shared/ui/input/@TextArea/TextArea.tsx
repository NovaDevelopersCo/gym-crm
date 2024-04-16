import { type ChangeEventHandler, type FC, useId } from 'react'
import type { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'

import { Input } from 'antd'
import { TextAreaProps } from 'antd/es/input'
import clsx from 'clsx'

import cl from './../index.module.scss'

const { TextArea: AntdTextArea } = Input

type TTextAreaProps = TextAreaProps & {
	label?: string
	error?: string | FieldError | Merge<FieldError, FieldErrorsImpl>
	field: {
		onChange: ChangeEventHandler<HTMLTextAreaElement>
		value: string | string[] | number
	}
	bodyClassName?: string
}

export const TextArea: FC<TTextAreaProps> = ({
	bodyClassName,
	label,
	field,
	error,
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
			<AntdTextArea
				{...field}
				{...props}
				id={id}
				className={clsx(
					cl.root__input,
					cl.root__input_textarea,
					error ? cl.root__input_inputErr : ''
				)}
			/>
			<span className={cl.root__input_textErr}>{error?.toString()}</span>
		</div>
	)
}
