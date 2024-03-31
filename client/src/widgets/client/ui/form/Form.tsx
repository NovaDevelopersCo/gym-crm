import { Controller, useForm } from 'react-hook-form'

import { Button, Input, Select } from '@/shared'
import { Typography } from 'antd'

import cl from './Form.module.scss'
import { newClientFromItemsArr } from './form.data'

// add textarea

type TNewClientFrom = {
	fio: string
	phone: number
	email: string
	telegram: string
	age: number
	birthdayDate: string
	howDoYouKnow: string
	club: string // select
	beforeDirection: string
	direction: string[] // select
	groupIds: string[] // select
}

const { Title } = Typography

const Form = () => {
	const { handleSubmit, control } = useForm<TNewClientFrom>()

	const onSubmit = (data: TNewClientFrom) => {
		console.log(data)
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={cl.root}>
			<Title level={2} className={cl.root__title}>
				Анкета посетителя
			</Title>
			{newClientFromItemsArr.map(i =>
				i.options ? (
					<Select
						placeholder={i.label}
						bodyClassName={cl.root__item}
						key={i.name}
						{...i}
					/>
				) : (
					<Controller
						name={i.name}
						control={control}
						key={i.name}
						render={({ field }) => (
							<Input
								bodyClassName={cl.root__item}
								field={field}
								{...i}
							/>
						)}
					/>
				)
			)}
			<Button className={cl.root__button} size='large' htmlType='submit'>
				Добавить
			</Button>
		</form>
	)
}

export default Form
