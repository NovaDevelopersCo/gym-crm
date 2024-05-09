import { ApiProperty, PickType, OmitType } from '@nestjs/swagger'
import { PaginationResponse, CommonPropertiesSwagger } from '@/core/swagger'
import { ClubEntity } from '../entities'
import { StaffEntity } from '@/modules/staff/entities'
import { GroupEntity } from '@/modules/group/entities'

export class ClubDto extends OmitType(ClubEntity, ['admins', 'groups']) {
	@ApiProperty({
		type: () => PickType(StaffEntity, ['id', 'email', 'role']),
		isArray: true
	})
	public readonly admins: unknown

	@ApiProperty({
		type: () => PickType(GroupEntity, ['id', 'name']),
		isArray: true
	})
	public readonly groups: unknown
}

export class GetClubByIdOk extends ClubDto {}

export class GetAllClubsOk extends PaginationResponse {
	@ApiProperty({
		isArray: true
	})
	private readonly items: ClubDto
}

class ClubAdmin {
	@CommonPropertiesSwagger.id()
	private readonly id: number
}

export class CreateClubOk extends PickType(ClubDto, ['address', 'id', 'name']) {
	@ApiProperty({
		type: () => ClubAdmin,
		isArray: true
	})
	private readonly admins: unknown
}
export class UpdateClubOk extends ClubDto {}
export class GroupClub extends OmitType(ClubDto, ['groups', 'users', 'admins']) {}
export class UserClub extends PickType(ClubDto, ['id', 'address', 'name']) {}
export class StaffClub extends OmitType(GetClubByIdOk, ['groups', 'users', 'admins']) {}
