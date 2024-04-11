import { useState } from 'react'

import { Button, Input, Table } from 'antd'

import { Modal } from '@shared/ui'

import { stuffArr } from './stuff.data'

import cl from './StuffList.module.scss'

export type Employee = {
	id: number
	name: string
	position: string
	age: number
}

export const StaffList = () => {
	const [employees, setEmployees] = useState(stuffArr)
	const [isModalVisible, setIsModalVisible] = useState(false)
	const [newEmployee, setNewEmployee] = useState({
		name: '',
		position: '',
		age: 0
	})

	const columns = [
		{ title: 'ID', dataIndex: 'id', key: 'id' },
		{ title: 'Name', dataIndex: 'name', key: 'name' },
		{ title: 'Position', dataIndex: 'position', key: 'position' },
		{
			title: 'Age',
			dataIndex: 'age',
			key: 'age',
			sorter: (a: Employee, b: Employee) => a.age - b.age
		},
		{
			title: 'Action',
			key: 'action',
			render: (record: Employee) => (
				<Button onClick={() => handleDelete(record.id)}>Delete</Button>
			)
		}
	]

	const handleDelete = (id: number) => {
		setEmployees(employees.filter(employee => employee.id !== id))
	}

	const handleAdd = () => {
		setIsModalVisible(true)
	}

	const handleCancel = () => {
		setIsModalVisible(false)
		setNewEmployee({ name: '', position: '', age: 0 })
	}

	const handleSubmit = () => {
		const newId = employees.length + 1
		setEmployees([...employees, { id: newId, ...newEmployee }])
		setIsModalVisible(false)
		setNewEmployee({ name: '', position: '', age: 0 })
	}

	return (
		<div className={cl.root}>
			<Button onClick={handleAdd} className={cl.root__add_btn}>Add Employee</Button>
			<Table columns={columns} dataSource={employees} />
			<Modal isOpen={isModalVisible} setIsOpen={setIsModalVisible}>
				<form>
					<h2>Add Employee</h2>
					<label autoFocus htmlFor='name'>
						Name
					</label>
					<Input
						required
						id='name'
						value={newEmployee.name}
						onChange={e =>
							setNewEmployee({
								...newEmployee,
								name: e.target.value
							})
						}
					/>
					<label htmlFor='position'>Position</label>
					<Input
						required
						id='position'
						value={newEmployee.position}
						onChange={e =>
							setNewEmployee({
								...newEmployee,
								position: e.target.value
							})
						}
					/>
					<label htmlFor='age'>Age</label>
					<Input
						type='number'
						required
						id='age'
						value={newEmployee.age}
						onChange={e =>
							setNewEmployee({
								...newEmployee,
								age: parseInt(e.target.value)
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
