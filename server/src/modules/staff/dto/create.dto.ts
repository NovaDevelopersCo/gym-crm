import { EStaffRole } from '@/core/enums'
import { CommonDecoratorsSwagger } from '@/core/swagger'
import { StaffDecoratorsSwagger } from '../swagger/decorators'

export class CreateStaffDto {
	@CommonDecoratorsSwagger.password(true)
	password: string

	@CommonDecoratorsSwagger.email(true)
	email: string

	@StaffDecoratorsSwagger.role(true, true)
	role: EStaffRole
}
