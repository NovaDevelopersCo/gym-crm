import { EStaffRole } from '@/core/enums'
import { CommonPropertiesSwagger } from '@/core/swagger'
import { StaffPropertiesSwagger } from '../swagger/properties'

export class CreateStaffDto {
	@CommonPropertiesSwagger.password()
	public readonly password: string

	@CommonPropertiesSwagger.email()
	public readonly email: string

	@StaffPropertiesSwagger.role()
	public readonly role: EStaffRole
}
