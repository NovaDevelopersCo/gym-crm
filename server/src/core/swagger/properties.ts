import { IsString, MinLength, MaxLength, IsEmail, IsInt } from 'class-validator'
import { propertiesSwagger } from '../utils'

export class CommonPropertiesSwagger {
	public static password() {
		const minLength = 8
		const maxLength = 32

		return propertiesSwagger({
			example: 'password',
			description: 'Пароль',
			decorators: [
				IsString({ message: 'Пароль должен быть строкой' }),
				MinLength(minLength, {
					message: `Минимальная длина пароля ${minLength} символов`
				}),
				MaxLength(maxLength, {
					message: `Максимальная длина пароля ${maxLength} символа`
				})
			],
			maxLength,
			minLength
		})
	}

	public static email() {
		const maxLength = 200

		return propertiesSwagger({
			example: 'email@email.com',
			description: 'Почтовый адрес',
			decorators: [
				IsEmail({}, { message: 'Невалидная почта' }),
				MaxLength(maxLength, {
					message: `Максимальная длина почты ${maxLength} символов`
				})
			],
			maxLength
		})
	}

	public static id() {
		return propertiesSwagger({
			example: 1,
			description: 'Id сущности',
			decorators: [IsInt({ message: 'Id должен быть числом' })]
		})
	}

	public static clubId() {
		return propertiesSwagger({
			example: 1,
			description: 'Id клуба',
			decorators: [IsInt({ message: 'Id клуба должен быть числом' })]
		})
	}
}
