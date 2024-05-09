import { IsEnum } from 'class-validator'
import { ECreateStaffRole } from '@/core/enums'
import { propertiesSwagger } from '@/core/utils'

export class StaffPropertiesSwagger {
	public static role() {
		return propertiesSwagger({
			example: 'admin',
			decorators: [IsEnum(ECreateStaffRole, { message: 'Невалидная роль' })],
			enum: ECreateStaffRole,
			description: 'Роль пользователя'
		})
	}
}
