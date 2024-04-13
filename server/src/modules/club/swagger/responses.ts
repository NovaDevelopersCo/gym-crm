import { ApiProperty, PickType, OmitType } from '@nestjs/swagger'
import { StaffEntity } from '@/modules/staff/entities'
import { GroupEntity } from '@/modules/group/entities'
import { UserEntity } from '@/modules/user/entities'
import { PaginationResponse } from '@/core/swagger'
import { CreateClubDto } from '../dto'
import { GetStaffByIdOk } from '@/modules/staff/swagger'

export class GetClubByIdOk extends OmitType(CreateClubDto, ['admin']) {
	@ApiProperty({
		default: 1
	})
	id: number

	@ApiProperty({
		default: ['список групп....']
	})
	groups: GroupEntity[]
	@ApiProperty({
		default: ['список пользователей....']
	})
	users: UserEntity[]

	@ApiProperty()
	admin: GetStaffByIdOk
}

export class GetAllClubsOk extends PaginationResponse {
	@ApiProperty({
		isArray: true
	})
	items: GetClubByIdOk
}

export class CreateClubOk extends PickType(GetClubByIdOk, ['address', 'id', 'name']) {
	@ApiProperty({
		default: {
			id: 1
		}
	})
	admin: StaffEntity
}
export class UpdateClubOk extends CreateClubOk {}
