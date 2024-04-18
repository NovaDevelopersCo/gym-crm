import { ApiProperty, OmitType, IntersectionType } from '@nestjs/swagger'
import { EStaffRole } from '@/core/enums'
import { StaffClub } from '@/modules/club/swagger'
import { CreateStaffDto } from '../dto'
import { PaginationResponse } from '@/core/swagger'

export class StaffDto extends OmitType(CreateStaffDto, ['password', 'fio']) {
	@ApiProperty({
		example: 35
	})
	id: number

	@ApiProperty({
		example: 'Васильев Василий Васильевич'
	})
	fio: string
}

export class FullStaff extends OmitType(StaffDto, ['role']) {
	@ApiProperty({
		enum: EStaffRole,
		example: 'admin'
	})
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
