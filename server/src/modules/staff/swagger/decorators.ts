import { applyDecorators } from '@nestjs/common'
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger'
import { IsString, MinLength, MaxLength, IsEmail, IsEnum } from 'class-validator'
import { staffConfig } from '../config'
import { ECreateStaffRole, EStaffRole } from '@/core/enums'

export class StaffDecoratorsSwagger {
	static password(withValidation?: boolean) {
		const { maxLength, minLength } = staffConfig.password

		const validation: ApiPropertyOptions = {}

		const decorators = []

		if (withValidation) {
			validation.minLength = minLength
			validation.maxLength = maxLength
			decorators.push(
				IsString({ message: 'Пароль должен быть строкой' }),
				MinLength(minLength, {
					message: `Минимальная длина пароля ${minLength} символов`
				}),
				MaxLength(maxLength, {
					message: `Максимальная длина пароля ${maxLength} символа`
				})
			)
		}

		decorators.push(
			ApiProperty({
				example: 'password',
				...validation
			})
		)

		return applyDecorators(...decorators)
	}

	static email(withValidation?: boolean) {
		const decorators = [
			ApiProperty({
				example: 'email@email.com'
			})
		]

		if (withValidation) {
			decorators.push(IsEmail({}, { message: 'Невалидная почта' }))
		}

		return applyDecorators(...decorators)
	}

	static role(withValidation?: boolean, isCreate?: boolean) {
		const decorators = [
			ApiProperty({
				example: 'admin',
				enum: isCreate ? ECreateStaffRole : EStaffRole
			})
		]

		if (withValidation) {
			decorators.push(IsEnum(EStaffRole, { message: 'Невалидная роль' }))
		}

		return applyDecorators(...decorators)
	}
}
