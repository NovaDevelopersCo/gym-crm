import { FC, PropsWithChildren, useRef } from 'react'

import { PlusOutlined } from '@ant-design/icons'
import { Button, Divider, Input, Select, Space } from 'antd'
import type { InputRef } from 'antd'

import { TCreatableSelectProps } from '../../model'

export const CreatableSelect: FC<PropsWithChildren<TCreatableSelectProps>> = ({
	placeholder,
	style,
	mode,
	options,

	createPlaceholder,
	onCreateOption,

	value,
	setValue,
	children
}) => {
	const inputRef = useRef<InputRef>(null)
	const filteredOptions = options?.filter(o => !value.includes(o))

	return (
		<Select
			placeholder={placeholder}
			style={style || { width: '100%' }}
			mode={mode}
			options={filteredOptions}
			onSelect={(option) => setValue(prev => [...prev, option])}
			dropdownRender={menu => (
				<>
					{menu}
					<Divider style={{ margin: '8px 0' }} />
					<Space
						style={{
							padding: '0 8px 4px',
							display: 'flex',
							justifyContent: 'space-between'
						}}
						styles={{ item: { display: 'contents' } }}
					>
						<Input
							placeholder={createPlaceholder}
							ref={inputRef}
						/>
						{children}
						<Button
							type='text'
							icon={<PlusOutlined />}
							onClick={e => {
								e.preventDefault()
								if (
									onCreateOption &&
									inputRef.current?.input != null &&
									inputRef.current?.input.value
								)
									onCreateOption(
										inputRef.current?.input.value
									)
								setTimeout(() => {
									inputRef.current?.focus()
								}, 0)
							}}
						>
							Add item
						</Button>
					</Space>
				</>
			)}
		/>
	)
}
