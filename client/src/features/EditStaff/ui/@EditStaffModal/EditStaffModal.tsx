import { Button, Input, Modal } from '@/shared';
import { EStaffRoles, EditStaffDto, IStaff, useEditStaffMutation } from '@/store';
import { Dispatch, FC, SetStateAction } from 'react';

import cl from './EditStaffModal.module.scss'
import { Controller, useForm } from 'react-hook-form';

type EditStaffModalProps = {
	isModalVisible: boolean
	setIsModalVisible: Dispatch<SetStateAction<boolean>>
	staffId: IStaff['id']
}

const EditStaffModal: FC<EditStaffModalProps> = ({ isModalVisible, setIsModalVisible, staffId }) => {
	const {
		handleSubmit,
		control,
		formState: { errors },
		reset
	} = useForm<EditStaffDto>()

	const [editStaff,] = useEditStaffMutation()

	const handleCancel = () => {
		setIsModalVisible(false)
		reset()
	}

	const onSubmit = (data: Omit<EditStaffDto, 'id'>) => {
		editStaff({
			id: staffId,
			...data
		})
		setIsModalVisible(false)
	}
	return (
		<Modal isOpen={isModalVisible} setIsOpen={setIsModalVisible}>
			<form className={cl.root__form} onSubmit={handleSubmit(onSubmit)}>
				<h2 className={cl.root__form__title}>Изменить пользователя</h2>
				<Controller
					name="email"
					control={control}
					rules={{ required: true }}
					render={({ field }) => <>
						<label autoFocus htmlFor='email'>
							Почта:
						</label>
						<Input
							required
							id='email'
							field={field}
							error={errors.email?.message}
						/>
					</>}
				/>
				<Controller
					name="role"
					control={control}
					rules={{ value: EStaffRoles.ADMIN }}
					render={({ field }) => <>
						<label htmlFor='role'>ROLE:</label>
						<Input
							required
							id='role'
							field={field}
							error={errors.role?.message}
						/>
					</>}
				/>
				<Controller
					name="password"
					control={control}
					rules={{ required: true }}
					render={({ field }) => <>
						<label htmlFor='password'>PASSWORD:</label>
						<Input
							required
							id='password'
							field={field}
							error={errors.password?.message}
						/>
					</>}
				/>

				<Button type='primary' htmlType='submit'>
					Сохранить
				</Button>
				<Button type='text' danger onClick={handleCancel} htmlType='reset'>
					Отмена
				</Button>
			</form>
		</Modal>
	)
}

export default EditStaffModal