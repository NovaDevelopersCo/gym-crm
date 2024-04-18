import { Controller, useForm } from 'react-hook-form'

import { Button, Input, Select } from '@/shared'

import cl from './CreateGroup.module.scss'
import { createGroupFields } from './createGroup.data'

const CreateGroup = () => {
	const {
		handleSubmit,
		control,
		formState: { errors }
	} = useForm()

	const onSubmit = (data: unknown) => {
		console.log(data)
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={cl.root}>
			{createGroupFields.map(({ rules, ...i }) =>
				i.options ? (
					<Controller
						name={i.name}
						control={control}
						key={i.name}
						rules={rules}
						render={({ field }) => (
							<Select
								field={field}
								placeholder={i.label}
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
						render={({ field }) => (
							<Input
								field={field}
								bodyClassName={cl.root__input}
								error={errors[i.name]?.message}
								{...i}
							/>
						)}
					/>
				)
			)}
			<Button className={cl.root__btn} htmlType='submit'>
				Создать
			</Button>
		</form>
	)
}

export default CreateGroup
