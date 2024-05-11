import { Button, Input } from '@/shared'
import { CreateDirectionDto, useCreateDirectionMutation } from '@/store'
import { Form, FormProps } from 'antd'
import { Typography } from 'antd'

import styles from './AddDirectionForm.module.scss'

const { Title } = Typography

const AddDirectionForm = () => {
	const [createDirection, result] = useCreateDirectionMutation()

	const onFinish: FormProps<CreateDirectionDto>['onFinish'] = values => {
		createDirection({
			name: values.name
		})
		console.log('Success:', result)
	}

	const onFinishFailed: FormProps<unknown>['onFinishFailed'] = errorInfo => {
		console.log('Failed:', errorInfo)
	}

	return (
		<Form
			name='direction'
			initialValues={{ remember: true }}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			autoComplete='off'
			style={{ maxWidth: 500 }}
			onSubmitCapture={e => {
				e.preventDefault()
			}}
			className={styles.form}
		>
			<Form.Item>
				<Title level={5}>Создание нового направления</Title>
			</Form.Item>

			<Form.Item<Pick<CreateDirectionDto, 'name'>>
				name='name'
				rules={[
					{ required: true, message: 'Введите название направления!' }
				]}
			>
				<Input placeholder='Название' />
			</Form.Item>

			<Form.Item>
				<Button type='primary' htmlType='submit'>
					Создать
				</Button>
			</Form.Item>
		</Form>
	)
}

export default AddDirectionForm
