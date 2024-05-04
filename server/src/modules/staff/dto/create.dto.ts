import { EStaffRole } from '@/core/enums'
import { PropertyDecoratorsSwagger } from '@/core/swagger'
import { StaffPropertiesSwagger } from '../swagger/properties'

export class CreateStaffDto {
	@PropertyDecoratorsSwagger.password(true)
	password: string

	@PropertyDecoratorsSwagger.email(true)
	email: string

	@StaffPropertiesSwagger.role(true, true)
	role: EStaffRole
}
