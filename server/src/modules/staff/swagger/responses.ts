import { ApiProperty, OmitType, IntersectionType } from '@nestjs/swagger'
import { EStaffRole } from '@/core/enums'
import { StaffClub } from '@/modules/club/swagger'
import { CreateStaffDto } from '../dto'
import { PaginationResponse } from '@/core/swagger'
import { StaffDecoratorsSwagger } from './decorators'

export class StaffDto extends OmitType(CreateStaffDto, ['password']) {
	@ApiProperty({
		example: 35
	})
	id: number
}

export class FullStaff extends OmitType(StaffDto, ['role']) {
	@StaffDecoratorsSwagger.role()
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
