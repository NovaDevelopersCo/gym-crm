import { Dispatch, SetStateAction } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { Button, Input, Modal } from '@/shared'
import { EditGroupDto, useEditGroupMutation } from '@/store'

import { SelectClub, SelectDirection } from '@features/Select'

import cl from './EditGroupModal.module.scss'

export const EditGroupModal = ({
	isModalOpen,
	setIsModalOpen,
	groupId
}: {
	isModalOpen: boolean
	setIsModalOpen: Dispatch<SetStateAction<boolean>>
	groupId: EditGroupDto['id']
}) => {
	const { handleSubmit, control, reset } = useForm<EditGroupDto>()

	const [editGroup] = useEditGroupMutation()

	const onSubmit = (data: Omit<EditGroupDto, 'id'>) => {
		editGroup({
			id: groupId,
			...data
		})
		reset()
	}

	return (
		<Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
			<form onSubmit={handleSubmit(onSubmit)} className={cl.root}>
				<h2 className={cl.root__title}>Изменить группу</h2>
				<Controller
					name='name'
					control={control}
					render={({ field }) => (
						<Input
							label='Название группы'
							placeholder='Название группы'
							{...field}
						/>
					)}
				/>
				<Controller
					name='direction'
					control={control}
					render={({ field }) => (
						<SelectDirection
							placeholder='Направление'
							field={field}
						/>
					)}
				/>
				<Controller
					name='club'
					control={control}
					render={({ field }) => (
						<SelectClub placeholder='Клуб' field={field} />
					)}
				/>
				<Button htmlType='submit'>Сохранить</Button>
				<Button
					onClick={() => setIsModalOpen(false)}
					danger
					htmlType='reset'
					type='text'
				>
					Отмена
				</Button>
			</form>
		</Modal>
	)
}
