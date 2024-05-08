import { ApiProperty, PickType, OmitType } from '@nestjs/swagger'
import { PaginationResponse, CommonDtoSwagger } from '@/core/swagger'

import { ClubEntity } from '../entities'

export class ClubDto extends ClubEntity {}

export class GetClubByIdOk extends ClubDto {}

export class GetAllClubsOk extends PaginationResponse {
	@ApiProperty({
		isArray: true
	})
	items: ClubDto
}

class ClubAdmin {
	@CommonDtoSwagger.id()
	id: number
}

export class CreateClubOk extends PickType(ClubDto, ['address', 'id', 'name']) {
	@ApiProperty({
		type: () => ClubAdmin,
		isArray: true
	})
	admins: ClubAdmin[]
}
export class UpdateClubOk extends ClubDto {}
export class GroupClub extends OmitType(ClubDto, ['groups', 'users', 'admins']) {}
export class UserClub extends PickType(ClubDto, ['id', 'address', 'name']) {}
export class StaffClub extends OmitType(GetClubByIdOk, ['groups', 'users', 'admins']) {}
