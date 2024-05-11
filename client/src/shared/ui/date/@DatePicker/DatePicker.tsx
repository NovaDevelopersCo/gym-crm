import { FC, useId } from 'react'
import type {
	ControllerRenderProps,
	FieldError,
	FieldErrorsImpl,
	Merge
} from 'react-hook-form'

import { DatePicker as AntdDatePicker, type DatePickerProps } from 'antd'
import clsx from 'clsx'
import type { Dayjs } from 'dayjs'

import cl from './DatePicker.module.scss'

type TDatePickerProps = DatePickerProps & {
	label?: string
	error?: string | FieldError | Merge<FieldError, FieldErrorsImpl>
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	field?: ControllerRenderProps<any, any>
	bodyClassName?: string
}

export const DatePicker: FC<TDatePickerProps> = ({
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
					<span>{label}</span>
				</label>
			)}
			<AntdDatePicker
				{...(field as { value: Dayjs })}
				{...props}
				id={id}
				placeholder='Выберите дату'
				format='YYYY-MM-DD'
				className={clsx(
					cl.root__input,
					error ? cl.root__input_inputErr : ''
				)}
			/>
			<span className={cl.root__input_textErr}>{error?.toString()}</span>
		</div>
	)
}
