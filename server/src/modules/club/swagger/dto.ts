import { clubValidation } from '../validation'
import { IsString, MinLength, MaxLength, IsInt, ArrayMaxSize } from 'class-validator'
import { propertiesSwagger } from '@/core/utils'
import { Trim } from '@/core/decorators'

export class ClubDtoSwagger {
	static name_() {
		const { minLength, maxLength } = clubValidation.name

		return propertiesSwagger({
			example: 'Mass Club',
			description: 'Название клуба',
			...clubValidation.name,
			decorators: [
				IsString({ message: 'Название клуба должно быть строкой' }),
				Trim(),
				MinLength(minLength, {
					message: `Минимальная длина названия клуба ${minLength} символа`
				}),
				MaxLength(maxLength, {
					message: `Максимальная длина названия клуба ${maxLength} символов`
				})
			]
		})
	}

	static address() {
		const { minlength, maxLength } = clubValidation.address

		return propertiesSwagger({
			example: 'г. Москва ул. Шишкина д. 45',
			description: 'Адрес клуба',
			decorators: [
				IsString({ message: 'Адрес клуба должен быть строкой' }),
				MinLength(minlength, {
					message: `Минимальная длина названия клуба должна быть ${minlength} символа`
				}),
				MaxLength(maxLength, {
					message: `Максимальная длина названия клуба должна быть ${maxLength} символов`
				})
			],
			...clubValidation.address
		})
	}

	static admins() {
		const { maxItems } = clubValidation.admins

		return propertiesSwagger({
			example: [111, 222],
			decorators: [
				ArrayMaxSize(maxItems, {
					message: `У клуба может быть не более ${maxItems} админов`
				}),
				IsInt({ message: 'Id админа должно быть числом', each: true })
			],
			...clubValidation.admins
		})
	}
}
