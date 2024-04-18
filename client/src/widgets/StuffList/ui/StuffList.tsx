import { useState } from 'react'

import { Modal } from '@/shared'
import { Button, Input, Radio, Table } from 'antd'

import cl from './StuffList.module.scss'
import { stuffArr } from './stuff.data'

export type Employee = {
	id: number
	name: string
	position: string
	age: number
}

export const StuffList = () => {
	const [employees, setEmployees] = useState(stuffArr)
	const [isModalVisible, setIsModalVisible] = useState(false)
	const [newEmployee, setNewEmployee] = useState({
		name: '',
		position: '',
		age: 0
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
			sorter: (a: Employee, b: Employee) => a.id - b.id
		},
		{ title: 'Name', dataIndex: 'name', key: 'name', width: '300px' },
		{
			title: 'Position',
			dataIndex: 'position',
			key: 'position',
			sorter: (a: Employee, b: Employee) =>
				a.position.localeCompare(b.position)
		},
		{
			title: 'Age',
			dataIndex: 'age',
			key: 'age',
			sorter: (a: Employee, b: Employee) => a.age - b.age,
			width: '10px'
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
			<Button onClick={handleAdd} className={cl.root__add_btn}>
				Add Employee
			</Button>
			<div className={cl.root__info}>
				<p>
					Всего работников: <span>{employees.length}</span>
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
				rowKey={(record: Employee) => record.id}
				dataSource={employees}
				scroll={{ x: 'max-content' }}
				pagination={{
					pageSize: paginationSize
				}}
			/>
			<Modal isOpen={isModalVisible} setIsOpen={setIsModalVisible}>
				<form className={cl.root__form}>
					<h2 className={cl.root__form__title}>Add Employee</h2>
					<label autoFocus htmlFor='name'>
						Name:
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
					<label htmlFor='position'>Position:</label>
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
					<label htmlFor='age'>Age:</label>
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
