import { ApiProperty, OmitType } from '@nestjs/swagger'
import { EStaffRole } from '@/core/enums'
import { GetClubByIdOk } from '@/modules/club/swagger'

export class CreateStaffOk {
	@ApiProperty({ enum: EStaffRole, default: 'admin' })
	role: EStaffRole

	@ApiProperty({
		default: 'email@email.com'
	})
	email: string

	@ApiProperty({
		default: 'Компос Докер Контанерович'
	})
	fio: string

	@ApiProperty({
		default: '35'
	})
	id: string
}

class ClubRelation extends OmitType(GetClubByIdOk, ['groups', 'users', 'admin'] as const) {}

export class GetOneStaff extends CreateStaffOk {
	@ApiProperty({ nullable: true })
	club: ClubRelation
}
