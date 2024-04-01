import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import {
	LoginUserDto,
	authApi,
	useAppDispatch,
	useAppSelector
} from '@store/index'

import Button from './@button/Button'
import Input from './@input/Input'
import cl from './LoginForm.module.scss'

export const LoginForm = () => {
	const {
		register,
		formState: { errors },
		handleSubmit
	} = useForm<LoginUserDto>()
	const dispatch = useAppDispatch()
	const error = useAppSelector(state => state['auth/slice'].error)
	const navigate  = useNavigate()

	const onSubmit: SubmitHandler<LoginUserDto> = data => {
		dispatch(authApi.endpoints.loginUser.initiate(data)).then(() =>
			navigate(0)
		)
	}

	return (
		<div className={cl.root}>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className={cl.root__container}
			>
				{error && <h1>{error}</h1>}
				<span className={cl.root__container__validate}>
					<Input
						error={errors?.email?.message}
						type='text'
						register={register('email', {
							required: 'Поле Почта обязательно к заполнению!'
						})}
						label='Почта'
					/>
					<span className={cl.root__container__validate_textErr}>
						{errors?.email?.message}
					</span>
				</span>
				<span className={cl.root__container__validate}>
					<Input
						error={errors?.password?.message}
						type='password'
						register={register('password', {
							required: 'Поле Пароль обязательно к заполнению!',
							minLength: {
								value: 6,
								message:
									'Пароль должен состоять не меньше чем из 6 символов!'
							}
						})}
						label='Пароль'
					/>
					<span className={cl.root__container__validate_textErr}>
						{errors?.password?.message}
					</span>
				</span>
				<Button
					error={errors?.password?.message || errors?.email?.message}
					text='Вход'
				/>
			</form>
		</div>
	)
}
