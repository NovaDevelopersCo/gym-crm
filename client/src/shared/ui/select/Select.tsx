import { FC } from 'react'

import { Select as SelectAntd } from 'antd'
import clsx from 'clsx'

import cl from './Select.module.scss'
import './Select.scss'
import { TSelectOption, TSelectProps } from './Select.types'

const Select: FC<TSelectProps> = ({
	className,
	field,
	style,
	value,
	setValue,
	bodyClassName,
	...props
}) => {
	return (
		<>
			{value && setValue ? (
				<SelectAntd
					showSearch
					style={style || { width: '100%' }}
					className={clsx(cl.root, className)}
					/** Custom react control */
					value={() => {
						return value && typeof value === 'object'
							? (value as TSelectOption)?.value
							: Array.isArray(value)
								? (value as TSelectOption[] | undefined)?.map(
										item => item.value
									)
								: undefined
					}}
					onChange={(_val, opt) => {
						if (!setValue) return _val
						if (Array.isArray(opt)) setValue(opt as TSelectOption[])
						else if (typeof opt === 'object')
							setValue(opt as TSelectOption)
					}}
					popupClassName={bodyClassName}
					{...props}
					getPopupContainer={trigger => trigger.parentNode}
				/>
			) : field != undefined ? (
				<SelectAntd
					showSearch
					style={style || { width: '100%' }}
					className={clsx(cl.root, className)}
					popupClassName={bodyClassName}
					{...props}
					// React Hook Form control
					{...field}
					getPopupContainer={trigger => trigger.parentNode}
				/>
			) : (
				<SelectAntd
					showSearch
					style={style || { width: '100%' }}
					className={clsx(cl.root, className)}
					popupClassName={bodyClassName}
					{...props}
					getPopupContainer={trigger => trigger.parentNode}
				/>
			)}
		</>
	)
}

export default Select
