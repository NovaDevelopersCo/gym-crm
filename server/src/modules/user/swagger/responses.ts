import { ApiProperty, OmitType, PickType } from '@nestjs/swagger'
import { CreateUserDto } from '../dto'
import { GetGroupByIdOk } from '@/modules/group/swagger'
import { GetClubByIdOk } from '@/modules/club/swagger'
import { MetaPagination } from '@/core/swagger'

export class ResponseUserDto extends PickType(CreateUserDto, ['fio', 'phone', 'email'] as const) {
	@ApiProperty()
	id: number
}

class GroupDto extends PickType(GetGroupByIdOk, ['id', 'name'] as const) {}
class ClubDto extends PickType(GetClubByIdOk, ['id', 'name', 'address'] as const) {}
export class GetUserByIdOk extends OmitType(CreateUserDto, ['groups', 'club'] as const) {
	@ApiProperty()
	groups: GroupDto

	@ApiProperty()
	club: ClubDto
}

export class GetAllUserDto {
	@ApiProperty()
	meta: MetaPagination

	@ApiProperty({ isArray: true })
	items: GetUserByIdOk
}
