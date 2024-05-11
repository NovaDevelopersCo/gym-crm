import { type FC, useId } from 'react'
import type {
	ControllerRenderProps,
	FieldError,
	FieldErrorsImpl,
	Merge
} from 'react-hook-form'

import { Input } from 'antd'
import { TextAreaProps } from 'antd/es/input'
import clsx from 'clsx'

import cl from './../index.module.scss'

const { TextArea: AntdTextArea } = Input

type TTextAreaProps = TextAreaProps & {
	label?: string
	error?: string | FieldError | Merge<FieldError, FieldErrorsImpl>
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	field?: ControllerRenderProps<any, any>
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
