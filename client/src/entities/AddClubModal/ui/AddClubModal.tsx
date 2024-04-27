import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { Button, Input, Modal } from '@/shared'
import { IClub } from '@/store'

import styles from './AddClubModal.module.scss'

type AddClubModalProps = {
	isModalOpen: boolean
	setIsModalOpen: Dispatch<SetStateAction<boolean>>
}

const AddClubModal: FC<AddClubModalProps> = ({
	isModalOpen,
	setIsModalOpen
}) => {
	const [editingClub] = useState<IClub | null>(null)
	const { handleSubmit, control, reset } = useForm<IClub>()

	useEffect(() => {
		// Something to do here
	}, [editingClub])

	const handleCancel = () => {
		setIsModalOpen(false)
		reset()
	}

	// data: Omit<IClub, 'id'>
	const onSubmit = () => {
		// if (editingClub) {
		// 	const updatedClubs = clubs.map(club =>
		// 		club.id === editingClub.id ? { ...club, ...data } : club
		// 	)
		// 	// setClubs(updatedClubs)
		// 	setEditingClub(null)
		// } else {
		// 	const id: Pick<IClub, 'id'>['id'] = (clubs.length + 1).toString()
		// 	const newClub: IClub = { id, ...data }
		// 	// setClubs([...clubs, newClub])
		// }

		setIsModalOpen(false)
		reset()
	}

	return (
		<Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				<h2 className={styles.form__title}>
					{editingClub ? 'Edit Club' : 'Add Club'}
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
				{/*
					<label htmlFor='admin'>Admin</label>
					<Controller
						name='admin'
						control={control}
						rules={{ required: true }}
						render={({ field }) => (
							<Input {...field} id='admin' type='text' />
						)}
					/> */}
				<Button htmlType='submit' type='primary'>
					{editingClub ? 'Save' : 'Add'}
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
