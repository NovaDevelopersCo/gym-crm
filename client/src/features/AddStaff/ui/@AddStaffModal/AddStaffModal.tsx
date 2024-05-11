import { Dispatch, FC, SetStateAction } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { Button, Input, Modal } from '@/shared'
import { CreateStaffDto, EStaffRoles, useCreateStaffMutation } from '@/store'

import cl from './AddStaffModal.module.scss'

type AddStaffModalProps = {
	isModalVisible: boolean
	setIsModalVisible: Dispatch<SetStateAction<boolean>>
}

const AddStaffModal: FC<AddStaffModalProps> = ({
	isModalVisible,
	setIsModalVisible
}) => {
	const {
		handleSubmit,
		control,
		formState: { errors },
		reset
	} = useForm<CreateStaffDto>()

	const [createStaff] = useCreateStaffMutation()

	const handleCancel = () => {
		setIsModalVisible(false)
		reset()
	}

	const onSubmit = (data: CreateStaffDto) => {
		createStaff(data)
		setIsModalVisible(false)
	}
	return (
		<Modal isOpen={isModalVisible} setIsOpen={setIsModalVisible}>
			<form className={cl.root__form} onSubmit={handleSubmit(onSubmit)}>
				<h2 className={cl.root__form__title}>Добавить пользователя</h2>
				<Controller
					name='email'
					control={control}
					rules={{ required: true }}
					render={({ field }) => (
						<>
							<label autoFocus htmlFor='email'>
								Почта:
							</label>
							<Input
								required
								id='email'
								field={field}
								error={errors.email?.message}
							/>
						</>
					)}
				/>
				<Controller
					name='role'
					control={control}
					rules={{ value: EStaffRoles.ADMIN }}
					render={({ field }) => (
						<>
							<label htmlFor='role'>ROLE:</label>
							<Input
								required
								id='role'
								field={field}
								error={errors.role?.message}
							/>
						</>
					)}
				/>
				<Controller
					name='password'
					control={control}
					rules={{ required: true }}
					render={({ field }) => (
						<>
							<label htmlFor='password'>PASSWORD:</label>
							<Input
								required
								id='password'
								field={field}
								error={errors.password?.message}
							/>
						</>
					)}
				/>

				<Button type='primary' htmlType='submit'>
					Добавить
				</Button>
				<Button
					type='text'
					danger
					onClick={handleCancel}
					htmlType='reset'
				>
					Отмена
				</Button>
			</form>
		</Modal>
	)
}

export default AddStaffModal
