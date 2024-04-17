import { FC } from 'react'
import type { ControllerRenderProps, FieldValues } from 'react-hook-form'

import { Select as SelectAntd, type SelectProps } from 'antd'
import clsx from 'clsx'

import cl from './Select.module.scss'
import './Select.scss'

const Select: FC<
	SelectProps & {
		field?: ControllerRenderProps<FieldValues, string>
	}
> = ({ className, field, style, ...props }) => {
	return (
		<SelectAntd
			showSearch
			style={style || { width: '100%' }}
			className={clsx(cl.root, className)}
			{...field}
			{...props}
		/>
	)
}

export default Select
