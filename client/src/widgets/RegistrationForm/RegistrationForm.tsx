import { SubmitHandler, useForm } from 'react-hook-form'

import cl from './RegistrationForm.module.scss'
import { Button } from './ui/@button'
import { Input } from './ui/@input'

interface formData {
	Login: string
	Password: string
}

export const RegistrationForm = () => {
	const {
		register,
		formState: { errors },
		handleSubmit
	} = useForm<formData>()

	const onSubmit: SubmitHandler<formData> = data => {
		console.log(data)
	}

	return (
		<div className={cl.root}>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className={cl.root__container}
			>
				<span className={cl.root__container__validate}>
					<Input
						error={errors?.Login?.message}
						type='text'
						register={register('Login', {
							required: 'Поле Логин обязательно к заполнению!'
						})}
						label='Логин'
					/>
					<span className={cl.root__container__validate_textErr}>
						{errors?.Login?.message}
					</span>
				</span>
				<span className={cl.root__container__validate}>
					<Input
						error={errors?.Password?.message}
						type='password'
						register={register('Password', {
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
						{errors?.Password?.message}
					</span>
				</span>
				<Button
					error={errors?.Password?.message || errors?.Login?.message}
					text='Вход'
				/>
			</form>
		</div>
	)
}
