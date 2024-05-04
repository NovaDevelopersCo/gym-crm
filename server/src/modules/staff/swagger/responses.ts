import { ApiProperty, OmitType, IntersectionType } from '@nestjs/swagger'
import { EStaffRole } from '@/core/enums'
import { StaffClub } from '@/modules/club/swagger'
import { CreateStaffDto } from '../dto'
import { PropertyDecoratorsSwagger, PaginationResponse } from '@/core/swagger'
import { StaffPropertiesSwagger } from './properties'

export class StaffDto extends OmitType(CreateStaffDto, ['password', 'email']) {
	@PropertyDecoratorsSwagger.id()
	id: number

	@PropertyDecoratorsSwagger.email()
	email: string
}

export class FullStaff extends OmitType(StaffDto, ['role']) {
	@StaffPropertiesSwagger.role()
	role: EStaffRole
}

export class CreateStaffOk extends StaffDto {}

export class UpdateStaffOk extends IntersectionType(StaffDto, FullStaff) {}

export class GetStaffByIdOk extends IntersectionType(StaffDto, FullStaff) {
	@ApiProperty({ nullable: true })
	club: StaffClub
}

export class GetAllStaffsOk extends PaginationResponse {
	@ApiProperty({ isArray: true })
	items: GetStaffByIdOk
}
