import { IsString, MinLength, MaxLength, IsEmail, IsInt } from 'class-validator'
import { propertiesSwagger } from '../utils'

export class PropertyDecoratorsSwagger {
	static password(withValidation?: boolean) {
		const minLength = 8
		const maxLength = 32

		return propertiesSwagger({
			example: 'password',
			decorators: withValidation
				? [
						IsString({ message: 'Пароль должен быть строкой' }),
						MinLength(minLength, {
							message: `Минимальная длина пароля ${minLength} символов`
						}),
						MaxLength(maxLength, {
							message: `Максимальная длина пароля ${maxLength} символа`
						})
					]
				: [],
			validation: withValidation ? { maxLength, minLength } : {}
		})
	}

	static email(withValidation?: boolean) {
		const maxLength = 200

		return propertiesSwagger({
			example: 'email@email.com',
			decorators: withValidation
				? [
						IsEmail({}, { message: 'Невалидная почта' }),
						MaxLength(maxLength, {
							message: `Максимальная длина почты ${maxLength} символов`
						})
					]
				: [],
			validation: withValidation ? { maxLength } : {}
		})
	}

	static id(withValidation?: boolean) {
		return propertiesSwagger({
			example: 1,
			decorators: withValidation ? [IsInt({ message: 'Id должен быть числом' })] : []
		})
	}

	static clubId(withValidation?: boolean) {
		return propertiesSwagger({
			example: 1,
			decorators: withValidation ? [IsInt({ message: 'Id клуба должен быть числом' })] : []
		})
	}

	static groupIds(withValidation?: boolean) {
		return propertiesSwagger({
			example: [3, 5, 8],
			decorators: withValidation
				? [IsInt({ each: true, message: 'Id групп должны быть числом' })]
				: []
		})
	}

	static userId(withValidation?: boolean) {
		return propertiesSwagger({
			example: 6,
			decorators: withValidation
				? [IsInt({ message: 'Id пользователя должен быть числом' })]
				: []
		})
	}

	static abonementId(withValidation?: boolean) {
		return propertiesSwagger({
			example: 8,
			decorators: withValidation
				? [IsInt({ message: 'Id абонемента должно быть числом' })]
				: []
		})
	}
}
