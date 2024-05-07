import { EStaffRole } from '@/core/enums'
import { CommonDtoSwagger } from '@/core/swagger'
import { StaffDtoSwagger } from '../swagger/dto'

export class CreateStaffDto {
	@CommonDtoSwagger.password()
	password: string

	@CommonDtoSwagger.email()
	email: string

	@StaffDtoSwagger.role()
	role: EStaffRole
}
