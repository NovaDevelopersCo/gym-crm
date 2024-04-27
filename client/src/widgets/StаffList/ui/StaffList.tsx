import { useState } from 'react'

import { Modal } from '@/shared'
import { EStaffRoles, IStaff, useGetStaffQuery } from '@/store'
import { Button, Input, Radio, Table } from 'antd'

import cl from './StaffList.module.scss'

export const StaffList = () => {
	// const [employees, ] = useState<IStaff[]>(staff as IStaff[])

	const { data: employees } = useGetStaffQuery()
	const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
	const [newEmployee, setNewEmployee] = useState<
		Omit<IStaff, 'id' | 'lastActivity'>
	>({
		fio: '',
		role: EStaffRoles.ADMIN,
		email: ''
	})
	const paginationSizeOptions = [10, 20, 50]
	const [paginationSize, setPaginationSize] = useState(
		paginationSizeOptions[0]
	)

	const columns = [
		{
			title: 'ID',
			dataIndex: 'id',
			key: 'id',
			width: '10px',
			sorter: (a: IStaff, b: IStaff) => a.id - b.id
		},
		{ title: 'FIO', dataIndex: 'fio', key: 'fio', width: '300px' },
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
			sorter: (a: IStaff, b: IStaff) => a.email.localeCompare(b.email)
		},
		{
			title: 'Role',
			dataIndex: 'role',
			key: 'role',
			sorter: (a: IStaff, b: IStaff) => a.role.localeCompare(b.role)
		},
		{
			title: 'Last activity',
			dataIndex: 'lastActivity',
			key: 'lastActivity',
			sorter: (a: IStaff, b: IStaff) =>
				a.lastActivity.localeCompare(b.lastActivity)
		},
		{
			title: 'Action',
			key: 'action',
			// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
			render: (_record: IStaff) => (
				<Button onClick={() => handleDelete()}>Delete</Button>
			)
		}
	]

	// id: number
	const handleDelete = () => {
		// setEmployees(employees.filter(employee => employee.id !== id))
	}

	const handleAdd = () => {
		setIsModalVisible(true)
	}

	const handleCancel = () => {
		setIsModalVisible(false)
		setNewEmployee({ fio: '', role: EStaffRoles.ADMIN, email: '' })
	}

	const handleSubmit = () => {
		// const newId = employees!.meta.total + 1
		// setEmployees([
		// 	...employees,
		// 	{ id: newId, ...newEmployee, lastActivity: '' }
		// ])
		setIsModalVisible(false)
		setNewEmployee({ fio: '', role: EStaffRoles.ADMIN, email: '' })
	}

	return (
		<div className={cl.root}>
			<Button onClick={handleAdd} className={cl.root__add_btn}>
				Add Employee
			</Button>
			<div className={cl.root__info}>
				<p>
					Всего работников: <span>{employees?.meta.total}</span>
				</p>
				<div className={cl.root__info__pagination}>
					<p>Отображать по:</p>
					<Radio.Group
						onChange={e => setPaginationSize(e.target.value)}
					>
						{paginationSizeOptions.map(size => (
							<Radio.Button key={size} value={size}>
								{size}
							</Radio.Button>
						))}
					</Radio.Group>
				</div>
			</div>
			<Table
				columns={columns}
				rowKey={(record: IStaff) => record.id}
				dataSource={employees?.items}
				scroll={{ x: 'max-content' }}
				pagination={{
					pageSize: paginationSize
				}}
			/>
			<Modal isOpen={isModalVisible} setIsOpen={setIsModalVisible}>
				<form className={cl.root__form}>
					<h2 className={cl.root__form__title}>Add Employee</h2>
					<label autoFocus htmlFor='name'>
						FIO:
					</label>
					<Input
						required
						id='fio'
						value={newEmployee.fio}
						onChange={e =>
							setNewEmployee({
								...newEmployee,
								fio: e.target.value
							})
						}
					/>
					<label htmlFor='role'>role:</label>
					<Input
						required
						id='role'
						value={newEmployee.role}
						onChange={e =>
							setNewEmployee({
								...newEmployee,
								role: e.target.value as EStaffRoles
							})
						}
					/>
					<Button type='primary' onClick={handleSubmit}>
						Submit
					</Button>
					<Button type='text' danger onClick={handleCancel}>
						Cancel
					</Button>
				</form>
			</Modal>
		</div>
	)
}
