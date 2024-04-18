import { Controller, FieldValues, useForm } from 'react-hook-form'

import { Select } from '@/shared'
import { Checkbox, Input } from 'antd'

import { SelectLocation } from '@features/Select'

import cl from './ClientsFilter.module.scss'

export const ClientsFilter = () => {
	const { control, handleSubmit } = useForm()

	const onSubmit = (data: FieldValues) => {
		console.log(data)
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={cl.root}>
			<div className={cl.root__cell}>
				<label htmlFor='search'>
					Для поиска введите не менее 3 символов
				</label>
				<Controller
					name='search'
					control={control}
					rules={{ required: true }}
					render={({ field }) => (
						<Input id='search' type='text' {...field} />
					)}
				/>
			</div>
			<div className={cl.root__cell}>
				<label htmlFor='location'>Локация</label>
				<Controller
					name='location'
					control={control}
					render={({ field }) => (
						<SelectLocation
							field={field}
							placeholder='Все локации'
							id='location'
							mode='multiple'
							showSearch={false}
						/>
					)}
				/>
			</div>
			<div className={cl.root__cell}>
				<label htmlFor='segment'>Сегмент</label>
				<Controller
					name='segment'
					control={control}
					render={({ field }) => <Input id='segment' {...field} />}
				/>
			</div>
			<div className={cl.root__cell}>
				<label htmlFor='days'>Пакет заканчивается в течении</label>
				<Controller
					name='days'
					control={control}
					render={({ field }) => (
						<Input
							placeholder='Количество дней'
							type='number'
							id='days'
							{...field}
						/>
					)}
				/>
			</div>
			<div className={cl.root__cell}>
				<label htmlFor='balance'>
					Остаток услуг в пакете менее или равен
				</label>
				<Controller
					name='balance'
					control={control}
					render={({ field }) => (
						<Input type='number' id='balance' {...field} />
					)}
				/>
			</div>
			<div className={cl.root__cell}>
				<label htmlFor='status'>Статус</label>
				<Controller
					name='status'
					control={control}
					render={({ field }) => (
						<Input type='text' id='status' {...field} />
					)}
				/>
			</div>
			<div className={cl.root__cell}>
				<label htmlFor='visit'>
					C последнего визита прошло не менее
				</label>
				<Controller
					name='visit'
					control={control}
					render={({ field }) => (
						<Input
							placeholder='Количество дней'
							type='number'
							id='visit'
							{...field}
						/>
					)}
				/>
			</div>
			<div className={cl.root__cell}>
				<label htmlFor='admin'>Ответственный администратор</label>
				<Controller
					name='admin'
					control={control}
					render={({ field }) => (
						<Select
							mode='multiple'
							placeholder='Любой'
							id='admin'
							className={cl.root__cell__select}
							options={[
								{
									label: 'Андрей Иванов',
									value: 'a.ivanov'
								},
								{
									label: 'Николай Торов',
									value: 'n.torov'
								},
								{
									label: 'Иван Петров',
									value: 'i.petrov'
								}
							]}
							{...field}
						/>
					)}
				/>
			</div>

			<div className={cl.root__cell}>
				<Controller
					name='withoutTasks'
					control={control}
					render={({ field }) => (
						<Checkbox
							className={cl.root__cell__checkbox}
							id='withoutTasks'
							checked={field.value}
							onChange={field.onChange}
						>
							Клиенты без активных задач
						</Checkbox>
					)}
				/>
			</div>
			<div className={cl.root__cell}>
				<Controller
					name='debtors'
					control={control}
					render={({ field }) => (
						<Checkbox
							className={cl.root__cell__checkbox}
							id='debtors'
							checked={field.value}
							onChange={field.onChange}
						>
							Показать должников
						</Checkbox>
					)}
				/>
			</div>
			<div className={cl.root__cell}>
				<Controller
					name='personalDiscount'
					control={control}
					render={({ field }) => (
						<Checkbox
							className={cl.root__cell__checkbox}
							id='personalDiscount'
							checked={field.value}
							onChange={field.onChange}
						>
							Клиенты с персональной скидкой
						</Checkbox>
					)}
				/>
			</div>
			<button>Найти</button>
		</form>
	)
}
