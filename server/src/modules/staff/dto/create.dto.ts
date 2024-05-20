import { EStaffRole } from '@/core/enums'
import { CommonPropertiesSwagger } from '@/core/swagger'
import { StaffPropertiesSwagger } from '../swagger/properties'

export class CreateStaffDto {
	@CommonPropertiesSwagger.password(true)
	public readonly password: string

	@CommonPropertiesSwagger.email(true)
	public readonly email: string

	@StaffPropertiesSwagger.roleCreate()
	public readonly role: EStaffRole
}
