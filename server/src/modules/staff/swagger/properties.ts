import { IsEnum } from 'class-validator'
import { ECreateStaffRole, EStaffRole } from '@/core/enums'
import { propertiesSwagger } from '@/core/utils'

export class StaffPropertiesSwagger {
	static role(withValidation?: boolean, isCreate?: boolean) {
		return propertiesSwagger({
			example: 'admin',
			decorators: withValidation ? [IsEnum(EStaffRole, { message: 'Невалидная роль' })] : [],
			validation: { enum: isCreate ? ECreateStaffRole : EStaffRole }
		})
	}
}
