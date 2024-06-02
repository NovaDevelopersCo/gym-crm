import { Button } from '@/shared'
import { BuyAbonementDto, useBuyAbonementMutation } from '@/store'
import { Form } from 'antd'

// eslint-disable-next-line
import { SelectAbonement, SelectClient } from '@features/Select'

import cl from './AbonementBuyForm.module.scss'

const AbonementBuyForm = () => {
	const [buyAbonement, result] = useBuyAbonementMutation()

	const onFinish = (values: BuyAbonementDto) => {
		buyAbonement({
			abonementId: values.abonementId,
			userId: values.userId
		})

		console.log('Success:', result)
	}

	const onFinishFailed = (errorInfo: unknown) => {
		console.log('Failed:', errorInfo)
	}

	return (
		<Form
			autoComplete='off'
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			className={cl.root}
			onSubmitCapture={e => {
				e.preventDefault()
			}}
		>
			<Form.Item
				className={cl.root__item}
				name='abonementId'
				rules={[{ required: true, message: 'Выберите абонемент!' }]}
			>
				<SelectAbonement placeholder='Выберите абонемент' />
			</Form.Item>
			<Form.Item
				className={cl.root__item}
				name='userId'
				rules={[{ required: true, message: 'Выберите клиента!' }]}
			>
				<SelectClient placeholder='Выберите клиента' />
			</Form.Item>
			<Form.Item className={cl.root__item}>
				<Button type='primary' htmlType='submit'>
					Купить
				</Button>
			</Form.Item>
		</Form>
	)
}

export default AbonementBuyForm
