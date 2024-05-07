import { IsString, MinLength, MaxLength, IsEmail, IsInt } from 'class-validator'
import { propertiesSwagger } from '../utils'

export class CommonDtoSwagger {
	static password() {
		const minLength = 8
		const maxLength = 32

		return propertiesSwagger({
			example: 'password',
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

	static email() {
		const maxLength = 200

		return propertiesSwagger({
			example: 'email@email.com',
			decorators: [
				IsEmail({}, { message: 'Невалидная почта' }),
				MaxLength(maxLength, {
					message: `Максимальная длина почты ${maxLength} символов`
				})
			],
			maxLength
		})
	}

	static id() {
		return propertiesSwagger({
			example: 1,
			decorators: [IsInt({ message: 'Id должен быть числом' })]
		})
	}

	static clubId() {
		return propertiesSwagger({
			example: 1,
			decorators: [IsInt({ message: 'Id клуба должен быть числом' })]
		})
	}

	static groupIds() {
		return propertiesSwagger({
			example: [3, 5, 8],
			decorators: [IsInt({ each: true, message: 'Id групп должны быть числом' })]
		})
	}

	static clubIds() {
		return propertiesSwagger({
			example: [1, 7, 10],
			decorators: [IsInt({ each: true, message: 'Id клубов должны быть числом' })]
		})
	}

	static userId() {
		return propertiesSwagger({
			example: 6,
			decorators: [IsInt({ message: 'Id пользователя должен быть числом' })]
		})
	}

	static abonementId() {
		return propertiesSwagger({
			example: 8,
			decorators: [IsInt({ message: 'Id абонемента должно быть числом' })]
		})
	}
}
