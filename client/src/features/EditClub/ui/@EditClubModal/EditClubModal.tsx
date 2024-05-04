import { Dispatch, FC, SetStateAction } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { Button, Input, Modal } from '@/shared'
import { CreateClubDto, EditClubDto, IClub, useEditClubMutation } from '@/store'

import styles from './EditClubModal.module.scss'
// eslint-disable-next-line
import { SelectAdmin } from '@features/Select'

type EditClubModalProps = {
	isModalOpen: boolean
	setIsModalOpen: Dispatch<SetStateAction<boolean>>
	clubId: IClub['id']
}

const EditClubModal: FC<EditClubModalProps> = ({
	isModalOpen,
	setIsModalOpen,
	clubId
}) => {
	const { handleSubmit, control, reset } = useForm<CreateClubDto>()

	const [editClub,] = useEditClubMutation()

	const handleCancel = () => {
		setIsModalOpen(false)
		reset()
	}

	const onSubmit = (data: Omit<EditClubDto, 'id'>) => {
		editClub({
			id: clubId,
			...data
		})
		setIsModalOpen(false)
		reset()
	}

	return (
		<Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				<h2 className={styles.form__title}>
					Изменить клуб
				</h2>
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
							<SelectAdmin field={field} id='admins' placeholder="Select admin" mode="multiple" />
						)
					}}
				/>
				<Button htmlType='submit' type='primary'>
					Сохранить
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

export default EditClubModal
