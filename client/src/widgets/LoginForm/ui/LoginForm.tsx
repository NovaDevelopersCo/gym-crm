import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { LoginUserDto, authApi, useAppDispatch } from '@store/index'

import { Button, Input } from '@shared/ui'

import cl from './LoginForm.module.scss'

export const LoginForm = () => {
	const {
		formState: { errors },
		handleSubmit,
		control
	} = useForm<LoginUserDto>()
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	// const error = useAppSelector(state => state['auth/slice'].error)

	const onSubmit: SubmitHandler<LoginUserDto> = data => {
		dispatch(authApi.endpoints.loginUser.initiate(data)).finally(() =>
			navigate(0)
		)
	}

	return (
		<div className={cl.root}>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className={cl.root__container}
			>
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
					<span className={cl.root__container__validate_textErr}>
						{errors?.email?.message}
					</span>
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
					<span className={cl.root__container__validate_textErr}>
						{errors?.password?.message}
					</span>
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
