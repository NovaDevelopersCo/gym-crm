import { useState } from 'react'

import { Typography } from 'antd'

import { useAppSelector } from '@store/lib'

import {
	CreatableSelectArea,
	CreatableSelectGroup,
	CreatableSelectLocation
} from '@features/Select'

import { TOption } from '@shared/ui'

const { Title } = Typography

const Home = () => {
	const user = useAppSelector(state => state['auth/slice'].user!)
	const [value1, setValue1] = useState<TOption[]>([])
	const [value2, setValue2] = useState<TOption[]>([])
	const [value3, setValue3] = useState<TOption[]>([])

	return (
		<div>
			<Title>Welcome, {user?.fio}</Title>
			<CreatableSelectArea value={value1} setValue={setValue1} />
			<CreatableSelectGroup value={value2} setValue={setValue2} />
			<CreatableSelectLocation value={value3} setValue={setValue3} />
		</div>
	)
}

export default Home
