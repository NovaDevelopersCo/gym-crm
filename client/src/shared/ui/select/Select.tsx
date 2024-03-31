import { useRef } from 'react'
import ReactSelect, { GroupBase, Props, SelectInstance } from 'react-select'

import clsx from 'clsx'

import cl from './Select.module.scss'
import './Select.scss'

const Select = <
	Option,
	IsMulti extends boolean = false,
	Group extends GroupBase<Option> = GroupBase<Option>
>({
	label,
	bodyClassName,
	...props
}: Props<Option, IsMulti, Group> & {
	label?: string
	bodyClassName?: string
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
			<ReactSelect ref={selectRef} {...props} />
		</div>
	)
}

export default Select
