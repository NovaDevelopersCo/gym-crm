import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { redirect } from 'react-router-dom'

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
	const isAuth = useAppSelector(state => state['auth/slice'].isAuth)

	useEffect(() => {
		if (isAuth) {
			redirect('/')
		}
	}, [isAuth])

	const onSubmit: SubmitHandler<LoginUserDto> = data => {
		console.log(data)
		// return resp
		dispatch(authApi.endpoints.loginUser.initiate(data))
	}

	return (
		<div className={cl.root}>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className={cl.root__container}
			>
				<span className={cl.root__container__validate}>
					<Input
						error={errors?.login?.message}
						type='text'
						register={register('login', {
							required: 'Поле Логин обязательно к заполнению!'
						})}
						label='Логин'
					/>
					<span className={cl.root__container__validate_textErr}>
						{errors?.login?.message}
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
					error={errors?.password?.message || errors?.login?.message}
					text='Вход'
				/>
			</form>
		</div>
	)
}
