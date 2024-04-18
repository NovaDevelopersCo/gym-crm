import { Controller, useForm } from 'react-hook-form'

import { Button, Input, Select, TextArea } from '@/shared'
import { Typography } from 'antd'

import cl from './Form.module.scss'
import { newClientFromItemsArr } from './form.data'

type TNewClientFrom = {
	fio: string
	phone: number
	email: string
	telegram: string
	instagram: string
	age: number
	birthdayDate: string
	howDoYouKnow: string
	club: string
	beforeDirection: string
	direction: string[]
	groupIds: string[]
	commentary: string
}

const { Title } = Typography

const Form = () => {
	const {
		handleSubmit,
		control,
		formState: { errors }
	} = useForm<TNewClientFrom>()

	const onSubmit = (data: TNewClientFrom) => {
		console.log(data)
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={cl.root}>
			<Title level={2} className={cl.root__title}>
				Анкета посетителя
			</Title>
			{newClientFromItemsArr.map(({ isTextArea, rules, type, ...i }) =>
				i.options ? (
					<Controller
						name={i.name}
						control={control}
						key={i.name}
						render={({ field }) => (
							<Select
								// eslint-disable-next-line @typescript-eslint/ban-ts-comment
								// @ts-expect-error
								field={field}
								placeholder={i.label}
								bodyClassName={cl.root__item}
								{...i}
							/>
						)}
					/>
				) : (
					<Controller
						name={i.name}
						control={control}
						key={i.name}
						rules={rules}
						render={({ field }) =>
							isTextArea ? (
								<TextArea
									{...i}
									rows={4}
									bodyClassName={cl.root__item}
									field={field}
									error={errors[i.name]?.message}
								/>
							) : (
								<Input
									{...i}
									type={type}
									bodyClassName={cl.root__item}
									field={field}
									error={errors[i.name]?.message}
								/>
							)
						}
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