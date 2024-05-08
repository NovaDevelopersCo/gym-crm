import { ApiProperty, OmitType } from '@nestjs/swagger'
import { StaffClub } from '@/modules/club/swagger'
import { PaginationResponse } from '@/core/swagger'
import { StaffEntity } from '../entities'
import { ECreateStaffRole } from '@/core/enums'

export class StaffDto extends OmitType(StaffEntity, ['password', 'email']) {}

export class CreateStaffOk extends OmitType(StaffDto, ['role']) {
	@ApiProperty({
		enum: ECreateStaffRole,
		description: 'Роль пользователя'
	})
	private readonly role: ECreateStaffRole
}

export class FullStaff extends OmitType(StaffDto, ['role']) {
	@ApiProperty({
		enum: ECreateStaffRole,
		description: 'Роль пользователя'
	})
	private readonly role: ECreateStaffRole
}

export class UpdateStaffOk extends StaffDto {}

export class GetStaffByIdOk extends OmitType(StaffDto, ['club']) {
	@ApiProperty({ nullable: true })
	private readonly club: StaffClub
}

export class GetAllStaffsOk extends PaginationResponse {
	@ApiProperty({ isArray: true })
	private readonly items: GetStaffByIdOk
}
