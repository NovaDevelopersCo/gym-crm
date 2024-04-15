import { useRef } from 'react'
import ReactSelect, {
	GroupBase,
	Props,
	PropsValue,
	SelectInstance
} from 'react-select'

import clsx from 'clsx'

import cl from './Select.module.scss'
import './Select.scss'
import { TOption } from '../types'

const Select = <
	Option extends TOption,
	IsMulti extends boolean = false,
	Group extends GroupBase<Option> = GroupBase<Option>
>({
	label,
	bodyClassName,
	field,
	...props
}: Props<Option, IsMulti, Group> & {
	label?: string
	bodyClassName?: string
	field: {
		value: unknown
		onChange: () => void
	}
}) => {
	const selectRef = useRef<SelectInstance<Option, IsMulti, Group>>(null)

	const labelClick = () => {
		if (selectRef.current) {
			selectRef.current.focus()
		}
	}

	return (
		<div className={clsx(cl.root, bodyClassName ?? '')}>
			{!!label && (
				<label className={cl.root__label} onClick={labelClick}>
					{label}
				</label>
			)}
			<ReactSelect
				{...(field as { value: PropsValue<Option> })}
				ref={selectRef}
				{...props}
			/>
		</div>
	)
}

export default Select
