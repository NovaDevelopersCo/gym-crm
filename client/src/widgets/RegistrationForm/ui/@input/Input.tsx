// import { useState } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'

import clsx from 'clsx'

import cl from './Input.module.scss'

export const Input = ({
	label,
	type,
	register,
	error,
	...props
}: {
	type: string
	label: string
	register: UseFormRegisterReturn
	error: string | FieldError | Merge<FieldError, FieldErrorsImpl> | undefined
}) => {
	const inputStyles = clsx(
		cl.root__input,
		error ? cl.root__input_inputErr : ''
	)

	return (
		<label className={cl.root}>
			<div className={cl.root__label}>{label}</div>
			<input
				{...props}
				type={type}
				{...register}
				className={inputStyles}
			/>
		</label>
	)
}
