import { Controller, useForm } from 'react-hook-form'

import { Button, Input, Select } from '@/shared'
import {
	CreateGroupDto,
	EStaffRoles,
	useAppSelector,
	useCreateGroupMutation
} from '@/store'

// eslint-disable-next-line
import { SelectClub, SelectDirection } from '@features/Select'

import cl from './AddGroupForm.module.scss'
import { createGroupFields } from './createGroupForm.data'

const AddGroupForm = () => {
	const {
		handleSubmit,
		control,
		reset,
		formState: { errors }
	} = useForm<CreateGroupDto>()

	const [createGroup] = useCreateGroupMutation()

	const onSubmit = (data: CreateGroupDto) => {
		createGroup(data)
		reset()
	}

	const { role, club } = useAppSelector(state => state['auth/slice'].user!)
	return (
		<form onSubmit={handleSubmit(onSubmit)} className={cl.root}>
			{createGroupFields.map(({ rules, ...formFieldProps }) => (
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
									return (
										<>
											{role != EStaffRoles.ADMIN ? (
												<SelectClub {...fieldProps} />
											) : (
												<SelectClub
													{...fieldProps}
													disabled
													defaultValue={club}
												/>
											)}
										</>
									)
								case 'direction':
									return <SelectDirection {...fieldProps} />
								default:
									return <Select {...fieldProps} />
							}
						}

						return (
							<Input
								bodyClassName={cl.root__input}
								error={errors[formFieldProps.name]?.message}
								{...fieldProps}
							/>
						)
					}}
				/>
			))}
			<Button className={cl.root__btn} htmlType='submit'>
				Создать
			</Button>
		</form>
	)
}

export default AddGroupForm
