import { FC, useId } from 'react'
import type { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'

import { Checkbox as AntdCheckbox, type CheckboxProps } from 'antd'
import type { CheckboxChangeEvent } from 'antd/es/checkbox'
import clsx from 'clsx'

import cl from './Checkbox.module.scss'

type TCheckboxProps = CheckboxProps & {
	field: {
		checked: boolean | undefined
		// eslint-disable-next-line no-unused-vars
		onChange: (e: CheckboxChangeEvent) => void
	}
	label?: string
	error?: string | FieldError | Merge<FieldError, FieldErrorsImpl>
}

export const Checkbox: FC<TCheckboxProps> = ({
	field,
	error,
	disabled,
	label,
	...props
}) => {
	const id = useId()

	return (
		<div className={cl.root}>
			<AntdCheckbox
				{...field}
				id={id}
				className={clsx(
					cl.root__checkbox,
					error ? cl.root__checkbox_checkboxErr : ''
				)}
				disabled={disabled}
				{...props}
			/>
			<label htmlFor={id} className={cl.root__label}>
				{label}
			</label>
			<span className={cl.root__checkbox_textErr}>
				{error?.toString()}
			</span>
		</div>
	)
}
