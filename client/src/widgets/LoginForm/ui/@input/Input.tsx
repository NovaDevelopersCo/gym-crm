import { FC, InputHTMLAttributes } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'

import clsx from 'clsx'

import cl from './Input.module.scss'

type TInputProps = {
	label: string
	register: UseFormRegisterReturn
	error: string | FieldError | Merge<FieldError, FieldErrorsImpl> | undefined
} & InputHTMLAttributes<HTMLInputElement>

const Input: FC<TInputProps> = ({ label, type, register, error, ...props }) => (
	<label className={cl.root}>
		<div className={cl.root__label}>{label}</div>
		<input
			type={type}
			className={clsx(cl.root__input, error && cl.root__input_inputErr)}
			{...props}
			{...register}
		/>
	</label>
)

export default Input
