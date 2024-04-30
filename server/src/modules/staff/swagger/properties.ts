import { applyDecorators } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'
import { IsEnum } from 'class-validator'
import { ECreateStaffRole, EStaffRole } from '@/core/enums'

export class StaffPropertiesSwagger {
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
