import { FC, useId } from 'react'
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'

import { Select as AntdSelect, SelectProps } from 'antd'
import clsx from 'clsx'

import cl from './Select.module.scss'
import { TOption } from './types'

type TSelectProps = SelectProps & {
	label?: string
	error?: string | FieldError | Merge<FieldError, FieldErrorsImpl>
	field: {
		onChange: () => void
		value: unknown
	}
	options?: TOption[]
	bodyClassName: string
}

const Select: FC<TSelectProps> = ({
	bodyClassName,
	options,
	label,
	error,
	field,
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
			<AntdSelect
				defaultValue={options ? options[0] : ''}
				options={options}
				{...field}
				{...props}
				id={id}
				className={clsx(
					cl.root__input,
					error ? cl.root__input_inputErr : ''
				)}
			/>
			<span className={cl.root__input_textErr}>{error?.toString()}</span>
		</div>
	)
}

export default Select
