import { EStaffRole } from '@/core/enums'
import { CommonDtoSwagger } from '@/core/swagger'
import { StaffDtoSwagger } from '../swagger/dto'

export class CreateStaffDto {
	@CommonDtoSwagger.password()
	public readonly password: string

	@CommonDtoSwagger.email()
	public readonly email: string

	@StaffDtoSwagger.role()
	public readonly role: EStaffRole
}
