import { Controller, useForm } from 'react-hook-form'

import { Button, Input, TextArea } from '@/shared'
import { Typography } from 'antd'

import cl from './Form.module.scss'
import { newClientFormFields } from './form.data'
import { CreateClientDto, useCreateClientMutation } from '@/store'
// eslint-disable-next-line
import { SelectClub, SelectGroup } from '@features/Select'

const { Title } = Typography

const Form = () => {
	const {
		handleSubmit,
		control,
		formState: { errors }
	} = useForm<CreateClientDto>()

	const [createUser, result] = useCreateClientMutation()

	const onSubmit = (data: CreateClientDto) => {
		createUser(data)
		console.groupCollapsed('createUser')
		console.log(result)
		console.groupEnd()
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
						render={({ field }) => {
							const props = {
								field: field,
								placeholder: i.label,
								bodyClassName: cl.root__item,
								...i
							}
							return (
								<>
									{field.name == 'club' && <SelectClub {...props} />}
									{field.name == 'groups' && <SelectGroup {...props} mode="multiple" />}
									{/* <Select
										field={field}
										placeholder={i.label}
										bodyClassName={cl.root__item}
										getPopupContainer={trigger =>
											trigger.parentElement
										}
										{...i}
									/> */}
								</>
							)
						}}
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
