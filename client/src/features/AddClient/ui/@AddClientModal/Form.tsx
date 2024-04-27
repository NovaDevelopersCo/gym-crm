import { Controller, FieldValues, useForm } from 'react-hook-form'

import { Button, Input, Select, TextArea } from '@/shared'
import { Typography } from 'antd'

import cl from './Form.module.scss'
import { newClientFormFields } from './form.data'

const { Title } = Typography

const Form = () => {
	const {
		handleSubmit,
		control,
		formState: { errors }
	} = useForm<FieldValues>()

	const onSubmit = (data: FieldValues) => {
		console.log(data)
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={cl.root}>
			<Title level={2} className={cl.root__title}>
				Анкета посетителя
			</Title>
			{newClientFormFields.map(({ isTextArea, rules, type, ...i }) =>
				i.options ? (
					<Controller
						rules={rules}
						name={i.name}
						control={control}
						key={i.name}
						render={({ field }) => (
							<Select
								field={field}
								placeholder={i.label}
								bodyClassName={cl.root__item}
								getPopupContainer={trigger =>
									trigger.parentElement
								}
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
