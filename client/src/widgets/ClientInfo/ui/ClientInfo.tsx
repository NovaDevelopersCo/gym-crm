import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import { Input, Select, Spinner, anyToString } from '@/shared'
import { IClient, useGetClientByIdQuery } from '@/store'
import { EditFilled } from '@ant-design/icons'

import {
	SelectClub,
	SelectGroup,
	clubsToParams,
	groupsToParams
} from '@features/Select'

// eslint-disable-next-line import/no-internal-modules
import { clientInfo } from '../data/clietnInfo.data'
import cl from './ClientInfo.module.scss'

const ClientInfo = () => {
	const { clientId } = useParams()
	const { data: client, isLoading } = useGetClientByIdQuery(clientId!)
	const [isDisabled, setIsDisabled] = useState<boolean>(true)

	const handleEdit = () => {
		setIsDisabled(prev => !prev)
	}

	const {
		handleSubmit,
		control,
		formState: { errors }
	} = useForm<IClient>()

	const onSubmit = (data: IClient) => {
		console.log(data)
	}
	if (isLoading) return <Spinner />
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
					{clientInfo.map(({ rules, name, ...i }) => (
						<Controller
							name={name}
							control={control}
							key={name}
							rules={rules}
							render={({ field }) => {
								if (i.type == 'select') {
									if (name == 'club') {
										return (
											<>
												<SelectClub
													field={field}
													defaultValue={
														clubsToParams([
															client!.club
														])[0]
													}
													// {...i}
												/>
											</>
										)
									} else if (name == 'groups') {
										return (
											<>
												<SelectGroup
													field={field}
													mode='multiple'
													defaultValue={groupsToParams(
														client!.groups
													)}
													// {...i}
												/>
											</>
										)
									}
									return (
										<Select
											style={{ zIndex: 2 }}
											disabled={isDisabled}
											field={field}
											placeholder={name}
											bodyClassName={
												cl.root__container_infoBlock_info
											}
											// {...i}
										/>
									)
								}
								return (
									<Input
										disabled={isDisabled}
										field={field}
										defaultValue={
											anyToString(client![name]) ||
											undefined
										}
										bodyClassName={
											cl.root__container_infoBlock_info
										}
										error={errors[name]?.message}
										{...i}
									/>
								)
							}}
						/>
					))}
				</div>
			</div>
		</form>
	)
}

export default ClientInfo
