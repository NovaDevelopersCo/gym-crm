import { Controller, useForm } from 'react-hook-form'

import { Button, Input, Select } from '@/shared'

import { createGroupFields } from './createGroupForm.data'
import cl from './AddGroupForm.module.scss'
import { CreateGroupDto } from '@/store'
// eslint-disable-next-line
import { SelectClub, SelectDirection } from '@features/Select'

const AddGroupForm = () => {
	const {
		handleSubmit,
		control,
		formState: { errors }
	} = useForm<CreateGroupDto>()

	const onSubmit = (data: CreateGroupDto) => {
		console.log(data)
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={cl.root}>
			{createGroupFields.map(({ rules, ...formFieldProps }) =>
				<Controller
					name={formFieldProps.name}
					control={control}
					key={formFieldProps.name}
					rules={rules}
					render={({ field }) => {
						const fieldProps = {
							field: field,
							placeholder: formFieldProps.label,
							...formFieldProps
						}

						if (formFieldProps.type == 'select') {
							switch (field.name) {
								case 'club':
									return <SelectClub {...fieldProps} />
								case 'direction':
									return <SelectDirection {...fieldProps} />
								default:
									return <Select {...fieldProps} />
							}
						}

						return <Input
							bodyClassName={cl.root__input}
							error={errors[formFieldProps.name]?.message}
							{...fieldProps}
						/>
					}}
				/>
			)}
			<Button className={cl.root__btn} htmlType='submit'>
				Создать
			</Button>
		</form>
	)
}

export default AddGroupForm
