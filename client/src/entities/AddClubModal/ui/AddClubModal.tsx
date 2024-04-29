import { Dispatch, FC, SetStateAction, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { Button, Input, Modal } from '@/shared'
import { CreateClubDto, IClub, useCreateClubMutation } from '@/store'

import styles from './AddClubModal.module.scss'
// eslint-disable-next-line 
import { SelectAdmin } from '@features/Select'

type AddClubModalProps = {
	isModalOpen: boolean
	setIsModalOpen: Dispatch<SetStateAction<boolean>>,
}

const AddClubModal: FC<AddClubModalProps> = ({
	isModalOpen,
	setIsModalOpen
}) => {
	const [editingClub] = useState<IClub | null>(null)
	const { handleSubmit, control, reset } = useForm<CreateClubDto>()

	const [createClub,] = useCreateClubMutation()

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
				<h2 className={styles.form__title}>
					{editingClub != null ? 'Edit Club' : 'Add Club'}
				</h2>
				<label htmlFor='name'>Name</label>
				<Controller
					name='name'
					control={control}
					rules={{ required: true }}
					render={({ field }) => (
						<Input {...field} id='name' type='text' autoFocus />
					)}
				/>
				<label htmlFor='address'>Address</label>
				<Controller
					name='address'
					control={control}
					rules={{ required: true }}
					render={({ field }) => (
						<Input {...field} id='address' type='text' />
					)}
				/>

				<label htmlFor='admins'>Admin</label>
				<Controller
					name='admins'
					control={control}
					rules={{ required: true }}
					render={({ field }) => {
						return (
							<SelectAdmin field={field} id='admins' placeholder="Select admin" />
						)
					}}
				/>
				<Button htmlType='submit' type='primary'>
					{editingClub != null ? 'Save' : 'Add'}
				</Button>
				<Button
					onClick={handleCancel}
					htmlType='reset'
					type='text'
					danger
				>
					Cancel
				</Button>
			</form>
		</Modal>
	)
}

export default AddClubModal
