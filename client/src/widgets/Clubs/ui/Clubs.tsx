import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { Modal } from '@/shared'
import { IClub } from '@/store'
import { Button, Input, Table } from 'antd'

import cl from './Clubs.module.scss'
import { clubsArr } from './clubs.data'

export const Clubs = () => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [clubs, seIClubs] = useState(clubsArr)

	const { handleSubmit, control, reset } = useForm<IClub>()

	const handleDelete = (id: string) => {
		seIClubs(clubs.filter(club => club.id !== id))
	}

	const handleCancel = () => {
		setIsModalOpen(false)
		reset()
	}

	const onSubmit = (data: Omit<IClub, 'id'>) => {
		const id: Pick<IClub, 'id'>['id'] = (clubs.length + 1).toString()
		const newClub: IClub = { id, ...data }
		seIClubs([...clubs, newClub])
		setIsModalOpen(false)
		reset()
	}

	const columns = [
		{
			title: 'ID',
			dataIndex: 'id',
			key: 'id',
			width: '10px',
			sorter: (a: IClub, b: IClub) => a.id.localeCompare(b.id)
		},
		{ title: 'Name', dataIndex: 'name', key: 'name', width: '300px' },
		{
			title: 'Address',
			dataIndex: 'address',
			key: 'address',
			sorter: (a: IClub, b: IClub) => a.address.localeCompare(b.address)
		},
		// {
		// 	title: 'Admin',
		// 	dataIndex: 'admin',
		// 	key: 'admin'
		// },
		{
			title: 'Action',
			key: 'action',
			render: (record: IClub) => (
				<Button onClick={() => handleDelete(record.id)}>Delete</Button>
			)
		}
	]

	return (
		<div className={cl.root}>
			<Button
				className={cl.root__button}
				onClick={() => setIsModalOpen(true)}
			>
				Add Club
			</Button>
			{/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
			{/* @ts-expect-error */}
			<Table columns={columns} dataSource={clubs} />
			<Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className={cl.root__form}
				>
					<h2 className={cl.root__form__title}>Add Club</h2>
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
						Add
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
		</div>
	)
}