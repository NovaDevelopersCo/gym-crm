import { IsEnum } from 'class-validator'
import { ECreateStaffRole, EStaffRole } from '@/core/enums'
import { propertiesSwagger } from '@/core/utils'

export class StaffDtoSwagger {
	static role() {
		return propertiesSwagger({
			example: 'admin',
			decorators: [IsEnum(EStaffRole, { message: 'Невалидная роль' })],
			enum: ECreateStaffRole
		})
	}
}
