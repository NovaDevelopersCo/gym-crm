import { clubValidation } from '../validation'
import { IsString, MinLength, MaxLength, IsNumber, ArrayMaxSize } from 'class-validator'
import { propertiesSwagger } from '@/core/utils'

export class ClubPropertiesSwagger {
	static name_(withValidation?: boolean) {
		const { minLength, maxLength } = clubValidation.name

		return propertiesSwagger({
			example: 'Mass Club',
			validation: withValidation ? clubValidation.name : {},
			decorators: withValidation
				? [
						IsString({ message: 'Название клуба должно быть строкой' }),
						MinLength(minLength, {
							message: `Минимальная длина названия клуба ${minLength} символа`
						}),
						MaxLength(maxLength, {
							message: `Максимальная длина названия клуба ${maxLength} символов`
						})
					]
				: []
		})
	}

	static address(withValidation?: boolean) {
		const { minlength, maxLength } = clubValidation.address

		return propertiesSwagger({
			example: 'г. Москва ул. Шишкина д. 45',
			decorators: withValidation
				? [
						IsString({ message: 'Адрес клуба должен быть строкой' }),
						MinLength(minlength, {
							message: `Минимальная длина названия клуба должна быть ${minlength} символа`
						}),
						MaxLength(maxLength, {
							message: `Максимальная длина названия клуба должна быть ${maxLength} символов`
						})
					]
				: [],
			validation: withValidation ? clubValidation.address : {}
		})
	}

	static adminIds(withValidation?: boolean) {
		const { maxItems } = clubValidation.admins

		return propertiesSwagger({
			example: [111, 222],
			decorators: withValidation
				? [
						ArrayMaxSize(maxItems, {
							message: `У клуба может быть не более ${maxItems} админов`
						}),
						IsNumber({}, { message: 'Id админа должно быть числом', each: true })
					]
				: [],
			validation: withValidation ? clubValidation.admins : {}
		})
	}
}
