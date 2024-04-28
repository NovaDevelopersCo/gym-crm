import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { Button, TextArea } from '@/shared/ui'
import { Descriptions } from 'antd'

import cl from './ClientStagesOfCooperation.module.scss'
import { stagesOfCooperationArr } from './clientStagesOfCooperation.data'

interface TStagesOfCooperation {
	clientInBase: string
	clientRegistrated: string
	clientVisited: string
	clientBuyAbonement: string
	clientRenewedAbonement: string
	clientDoNotSkipTrainings: string
}

export const ClientStagesOfCooperation = () => {
	const {
		handleSubmit,
		control,
		formState: { errors }
	} = useForm<TStagesOfCooperation>()

	const onSubmit = (data: TStagesOfCooperation) => {
		console.log(data)
	}

	const [isDisabled, setIsDisabled] = useState(true)

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={cl.root}>
			<span
				className={
					isDisabled
						? cl.root__blackout
						: `${cl.root__blackout} ${cl.root__blackout_active} `
				}
				onClick={() => setIsDisabled(prev => !prev)}
			/>
			<Descriptions
				extra={
					<div className={cl.root__extra}>
						{!isDisabled && (
							<Button style={{ zIndex: 1 }} htmlType='submit'>
								Save
							</Button>
						)}
						<Button
							style={{ zIndex: 1 }}
							onClick={() => setIsDisabled(prev => !prev)}
						>
							Edit
						</Button>
					</div>
				}
				layout='vertical'
				bordered
				title='Этапы сотрудничества'
			>
				{stagesOfCooperationArr.map(item => (
					<Descriptions.Item key={item.name} label={item.label}>
						<Controller
							name={item.name}
							control={control}
							key={item.name}
							render={({ field }) => (
								<TextArea
									style={{ zIndex: 1, height: 120 }}
									disabled={isDisabled}
									field={field}
									error={errors[item.name]}
									placeholder={item.commentary}
									bodyClassName={
										cl.root__container_infoBlock_info
									}
								/>
							)}
						/>
					</Descriptions.Item>
				))}
			</Descriptions>
		</form>
	)
}
