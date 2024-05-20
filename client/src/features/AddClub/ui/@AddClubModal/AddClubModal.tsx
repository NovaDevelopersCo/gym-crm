import { Dispatch, FC, SetStateAction } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { Button, Input, Modal } from '@/shared'
import { CreateClubDto, useCreateClubMutation } from '@/store'

// eslint-disable-next-line
import { SelectAdmin } from '@features/Select'

import styles from './AddClubModal.module.scss'

type AddClubModalProps = {
	isModalOpen: boolean
	setIsModalOpen: Dispatch<SetStateAction<boolean>>
}

const AddClubModal: FC<AddClubModalProps> = ({
	isModalOpen,
	setIsModalOpen
}) => {
	const { handleSubmit, control, reset } = useForm<CreateClubDto>()

	const [createClub] = useCreateClubMutation()

	const handleCancel = () => {
		setIsModalOpen(false)
		reset()
	}

	const onSubmit = (data: CreateClubDto) => {
		createClub(data)
		setIsModalOpen(false)
		reset()
	}

	return (
		<Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				<h2 className={styles.form__title}>Добавить клуб</h2>
				<label htmlFor='name'>Имя</label>
				<Controller
					name='name'
					control={control}
					rules={{ required: true }}
					render={({ field }) => (
						<Input {...field} id='name' type='text' autoFocus />
					)}
				/>
				<label htmlFor='address'>Адрес</label>
				<Controller
					name='address'
					control={control}
					rules={{ required: true }}
					render={({ field }) => (
						<Input {...field} id='address' type='text' />
					)}
				/>

				<label htmlFor='admins'>Админы</label>
				<Controller
					name='admins'
					control={control}
					rules={{ required: true }}
					render={({ field }) => {
						return (
							<SelectAdmin
								field={field}
								id='admins'
								placeholder='Администраторы'
								mode='multiple'
							/>
						)
					}}
				/>
				<Button htmlType='submit' type='primary'>
					Добавить
				</Button>
				<Button
					onClick={handleCancel}
					htmlType='reset'
					type='text'
					danger
				>
					Отмена
				</Button>
			</form>
		</Modal>
	)
}

export default AddClubModal
