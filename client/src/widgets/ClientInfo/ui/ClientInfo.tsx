'use client'

import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { EditFilled } from '@ant-design/icons'

import { DatePicker, Input, Select } from '@shared/ui'

import cl from './ClientInfo.module.scss'
import {
	firstClientInfo,
	secondClientInfo,
	thirdClientInfo
} from './ClientsInfo.data'

const ClientInfo = () => {
	type TClientInfo = {
		fio: string
		phone: number
		email: string
		birthdayDate: number
		club: string[]
		date: number
		card: number
		level: string[]
		trainer: string[]
		group: string[]
		discipline: string[]
		abonement: string[]
		when_purchased: number
		when_expires: number
		clients_notes: string
		administration_notes: string
	}

	const [isDisabled, setIsDisabled] = useState(true)

	const handleEdit = () => {
		setIsDisabled(prev => !prev)
	}

	const {
		handleSubmit,
		control,
		formState: { errors }
	} = useForm<TClientInfo>()

	const onSubmit = (data: TClientInfo) => {
		console.log(data)
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={cl.root}>
			<span
				className={
					isDisabled
						? cl.root__blackout
						: `${cl.root__blackout} ${cl.root__blackout_active} `
				}
				onClick={handleEdit}
			/>
			<div className={cl.root__container}>
				<div className={cl.root__container_title}>
					<span className={cl.root__container_title_text}>
						Информация о клиенте
					</span>
					<button
						type='button'
						className={cl.root__container_title_editBtn}
						onClick={handleEdit}
					>
						<EditFilled
							style={{
								display: 'flex',
								alignItems: 'end',
								color: '#63C2A4',
								fontSize: '20px'
							}}
							className={cl.root__container_title_editBtn_icon}
						/>
					</button>
					<button
						className={cl.root__container_title_submit}
						type='submit'
					>
						save
					</button>
				</div>
				<div className={cl.root__container_infoBlock}>
					<div className={cl.root__container_infoBlock_info}>
						{firstClientInfo.map(({ isDatepicker, rules, ...i }) =>
							i.options ? (
								<Controller
									name={i.name}
									control={control}
									key={i.name}
									render={({ field }) => (
										<Select
											disabled={isDisabled}
											field={field}
											placeholder={i.name}
											bodyClassName={
												cl.root__container_infoBlock_info_item
											}
											{...i}
										/>
									)}
								/>
							) : (
								<Controller
									name={i.name}
									control={control}
									key={i.name}
									rules={rules}
									render={({ field }) =>
										isDatepicker ? (
											<DatePicker
												// common={
												// 	field.value
												// 		? `*${new Date().getFullYear() - new Date(field.value).getFullYear()} лет`
												// 		: ''
												// }
												disabled={isDisabled}
												field={field}
												style={{ maxHeight: '45.14px' }}
												className={
													cl.root__container_infoBlock_info_item
												}
												format='DD-MM-YY'
												error={errors[i.name]?.message}
												{...i}
											/>
										) : (
											<Input
												disabled={isDisabled}
												field={field}
												bodyClassName={
													cl.root__container_infoBlock_info_item
												}
												error={errors[i.name]?.message}
												{...i}
											/>
										)
									}
								/>
							)
						)}
					</div>
					<div className={cl.root__container_infoBlock_info}>
						{secondClientInfo.map(({ rules, ...i }) =>
							i.options ? (
								<Controller
									name={i.name}
									control={control}
									key={i.name}
									render={({ field }) => (
										<Select
											disabled={isDisabled}
											field={field}
											placeholder={i.name}
											bodyClassName={
												cl.root__container_infoBlock_info_item
											}
											{...i}
										/>
									)}
								/>
							) : (
								<Controller
									name={i.name}
									control={control}
									key={i.name}
									rules={rules}
									render={({ field }) => (
										<Input
											disabled={isDisabled}
											field={field}
											bodyClassName={
												cl.root__container_infoBlock_info_item
											}
											error={errors[i.name]?.message}
											{...i}
										/>
									)}
								/>
							)
						)}
					</div>
					<div className={cl.root__container_infoBlock_info}>
						{thirdClientInfo.map(({ isDatepicker, rules, ...i }) =>
							i.options ? (
								<Controller
									name={i.name}
									control={control}
									key={i.name}
									render={({ field }) => (
										<Select
											disabled={isDisabled}
											field={field}
											placeholder={i.name}
											bodyClassName={
												cl.root__container_infoBlock_info_item
											}
											{...i}
										/>
									)}
								/>
							) : (
								<Controller
									name={i.name}
									control={control}
									key={i.name}
									rules={rules}
									render={({ field }) =>
										isDatepicker ? (
											<DatePicker
												disabled={isDisabled}
												field={field}
												style={{ maxHeight: '45.14px' }}
												className={
													cl.root__container_infoBlock_info_item
												}
												format='DD-MM-YY'
												error={errors[i.name]?.message}
												{...i}
											/>
										) : (
											<Input
												disabled={isDisabled}
												field={field}
												bodyClassName={
													cl.root__container_infoBlock_info_item
												}
												error={errors[i.name]?.message}
												{...i}
											/>
										)
									}
								/>
							)
						)}
					</div>
				</div>
			</div>
		</form>
	)
}

export default ClientInfo
