import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { Button, Input } from '@/shared'
import { LoginStaffDto, authApi, useAppDispatch, useAppSelector } from '@/store'

import cl from './LoginForm.module.scss'

// import { notification } from '@features/Notification'

const LoginForm = () => {
	const {
		formState: { errors },
		handleSubmit,
		control
	} = useForm<LoginStaffDto>()
	const dispatch = useAppDispatch()
	const error = useAppSelector(state => state['auth/slice'].error)

	const onSubmit: SubmitHandler<LoginStaffDto> = data => {
		dispatch(authApi.endpoints.loginUser.initiate(data))
		// .then(({ isError }) => {
		// 	const notificationConfig = {
		// 		title: isError ? 'Ошибка авторизации' : 'Успешно авторизован',
		// 		description: isError ? `${error?.message}` : `Добро пожаловать, ${user?.fio}`,
		// 		type: isError ? "error" : "success"
		// 	}
		// 	const openNotification = notification(notificationConfig)
		// })
	}

	return (
		<div className={cl.root}>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className={cl.root__container}
			>
				{error && (
					<h1 className={cl.root__container__message}>
						{error.toString()}
					</h1>
				)}
				<span className={cl.root__container__validate}>
					<Controller
						name='email'
						control={control}
						render={({ field }) => (
							<Input
								label='Почта'
								required
								field={field}
								type='text'
								error={errors?.email?.message}
							/>
						)}
					/>
				</span>
				<span className={cl.root__container__validate}>
					<Controller
						name='password'
						control={control}
						rules={{
							minLength: {
								value: 6,
								message:
									'Пароль должен состоять не меньше чем из 6 символов!'
							}
						}}
						render={({ field }) => (
							<Input
								label='Пароль'
								required
								field={field}
								type='password'
								error={errors?.password?.message}
							/>
						)}
					/>
				</span>
				<Button
					className={cl.root__container__button}
					htmlType='submit'
					size='large'
				>
					Вход
				</Button>
			</form>
		</div>
	)
}

export default LoginForm
