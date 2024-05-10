import { IsString, MinLength, MaxLength, IsEmail, IsInt } from 'class-validator'
import { Property } from '../utils'

export class CommonPropertiesSwagger {
	public static password(validation?: boolean) {
		const minLength = 8
		const maxLength = 32

		return new Property({
			validation,
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
		}).exec()
	}

	public static email(validation?: boolean) {
		const maxLength = 200

		return new Property({
			validation,
			example: 'email@gmail.com',
			description: 'Почтовый адрес',
			maxLength,
			decorators: [
				IsEmail({}, { message: 'Невалидная почта' }),
				MaxLength(maxLength, {
					message: `Максимальная длина почты ${maxLength} символов`
				})
			]
		}).exec()
	}

	public static id(validation?: boolean) {
		return new Property({
			example: 1,
			description: 'Id сущности',
			decorators: [IsInt({ message: 'Id должен быть числом' })],
			validation
		}).exec()
	}

	public static clubId() {
		return new Property({
			example: 1,
			description: 'Id клуба',
			decorators: [IsInt({ message: 'Id клуба должен быть числом' })],
			validation: true
		}).exec()
	}
}
