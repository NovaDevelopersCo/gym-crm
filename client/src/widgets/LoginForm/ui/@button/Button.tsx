import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'

import clsx from 'clsx'

import cl from './Button.module.scss'
import { ButtonHTMLAttributes, FC } from 'react'

type TButtonProps = {
	text: string
	error: string | FieldError | Merge<FieldError, FieldErrorsImpl> | undefined
} & ButtonHTMLAttributes<HTMLButtonElement>

const Button: FC<TButtonProps> = ({
	text,
	error,
	...props
}) => (
	<button type='submit' className={clsx(cl.root, error && cl.root_btnErr)} {...props}>
		{text}
	</button>
)

export default Button