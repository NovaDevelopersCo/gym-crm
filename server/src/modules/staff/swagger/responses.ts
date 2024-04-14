import { ApiProperty, OmitType } from '@nestjs/swagger'
import { GetClubByIdOk } from '@/modules/club/swagger'
import { CreateStaffDto } from '../dto'
import { PaginationResponse } from '@/core/swagger'

export class StaffDto extends OmitType(CreateStaffDto, ['password']) {
	@ApiProperty({
		default: 35
	})
	id: number
}

class ClubRelation extends OmitType(GetClubByIdOk, ['groups', 'users', 'admin'] as const) {}

export class GetOneStaff extends StaffDto {
	@ApiProperty({ nullable: true })
	club: ClubRelation
}

export class GetAllStaffsOk extends PaginationResponse {
	@ApiProperty({ isArray: true })
	items: GetOneStaff
}
