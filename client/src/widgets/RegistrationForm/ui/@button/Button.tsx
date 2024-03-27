import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'

import clsx from 'clsx'

import cl from './Button.module.scss'

export const Button = ({
	text,
	error
}: {
	text: string
	error: string | FieldError | Merge<FieldError, FieldErrorsImpl> | undefined
}) => {
	const buttonStyles = clsx(cl.root, error ? cl.root_btnErr : '')

	return (
		<button type='submit' className={buttonStyles}>
			{text}
		</button>
	)
}
