import { ApiProperty, OmitType, PickType } from '@nestjs/swagger'
import { ClubEntity } from '@/modules/club/entities'
import { PaginationResponse } from '@/core/swagger'
import { StaffEntity } from '../entities'
import { ECreateStaffRole } from '@/core/enums'

class StaffDto extends OmitType(StaffEntity, ['password', 'club']) {
	@ApiProperty({ nullable: true, type: () => PickType(ClubEntity, ['id', 'address', 'name']) })
	public readonly club: unknown
}

export class CreateStaffOk extends PickType(StaffDto, ['id', 'email']) {
	@ApiProperty({
		enum: ECreateStaffRole,
		description: 'Роль пользователя'
	})
	private readonly role: ECreateStaffRole
}

export class UpdateStaffOk extends OmitType(StaffDto, ['club']) {}

export class GetStaffByIdOk extends StaffDto {}

export class GetAllStaffsOk extends PaginationResponse {
	@ApiProperty({ isArray: true })
	private readonly items: GetStaffByIdOk
}
