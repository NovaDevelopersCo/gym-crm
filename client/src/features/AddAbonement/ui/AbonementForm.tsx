import { useState } from 'react'

import { Button, Input } from '@/shared'
import { CreateAbonementDto, useCreateAbonementMutation } from '@/store'
import { Form } from 'antd'

// eslint-disable-next-line
import { SelectClub } from '@features/Select'

import { abonementFieldsArr } from './AbonementForm.data'
import cl from './AbonementForm.module.scss'

const AbonementForm = () => {
	const [createAbonement, result] = useCreateAbonementMutation()
	const [isError, setError] = useState(false)

	const onFinish = (values: CreateAbonementDto) => {
		try {
			createAbonement({
				name: values.name,
				price: parseFloat(values.price.toString()),
				count: parseFloat(values.count.toString()),
				duration: values.duration,
				clubs: values.clubs
			})
			console.log('Success:', result)
			if (result.error) {
				setError(true)
			} else {
				setError(false)
			}
		} catch (error) {
			setError(true)
		}
	}

	const onFinishFailed = (errorInfo: unknown) => {
		console.log('Failed:', errorInfo)
	}

	return (
		<Form
			name='abonement'
			autoComplete='off'
			className={cl.root}
			initialValues={{ remember: true }}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			onSubmitCapture={e => {
				e.preventDefault()
			}}
		>
			{isError && (
				<div className={cl.root__error}>
					<span className={cl.root__error_text}>
						Произошла ошибка при создании абонемента
					</span>
					<span className={cl.root__error_text}>
						Укажите либо количество занятий, либо длительность
						абонемента!
					</span>
				</div>
			)}
			{abonementFieldsArr.map(item => (
				<>
					<Form.Item
						className={cl.root__item}
						key={item.name}
						name={item.name}
						rules={item.rules}
					>
						{item.isSelect ? (
							<SelectClub
								placeholder={item.label}
								mode='multiple'
							/>
						) : (
							<Input
								key={item.name}
								label={item.label}
								placeholder={item.placeholder}
							/>
						)}
					</Form.Item>
				</>
			))}
			<Form.Item className={cl.root__item}>
				<Button type='primary' htmlType='submit'>
					Создать
				</Button>
			</Form.Item>
		</Form>
	)
}

export default AbonementForm
