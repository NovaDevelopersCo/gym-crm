import { ApiProperty, OmitType } from '@nestjs/swagger'
import { GetClubByIdOk } from '@/modules/club/swagger'
import { CreateStaffDto } from '../dto'

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
