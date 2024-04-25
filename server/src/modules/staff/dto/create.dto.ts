import { EStaffRole } from '@/core/enums'
import { StaffDecoratorsSwagger } from '../swagger/decorators'

export class CreateStaffDto {
	@StaffDecoratorsSwagger.password(true)
	password: string

	@StaffDecoratorsSwagger.email(true)
	email: string

	@StaffDecoratorsSwagger.role(true, true)
	role: EStaffRole
}
