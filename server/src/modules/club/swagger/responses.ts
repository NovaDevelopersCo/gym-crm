import { ApiProperty } from '@nestjs/swagger'
import { PaginationResponse } from '@/core/swagger'
import { ClubDto } from './dto'
import { StaffAdminDto } from '@/modules/staff/swagger'
import { GroupDto } from '@/modules/group/swagger'
import { UserDto } from '@/modules/user/swagger'

class Club extends ClubDto {
	@ApiProperty({
		type: () => StaffAdminDto,
		isArray: true
	})
	public readonly admins: StaffAdminDto[]

	@ApiProperty({
		type: () => GroupDto,
		isArray: true
	})
	public readonly groups: GroupDto[]

	@ApiProperty({
		type: () => UserDto,
		isArray: true
	})
	public readonly users: UserDto[]
}

export class GetClubByIdOk extends Club {}

export class GetAllClubsOk extends PaginationResponse {
	@ApiProperty({
		isArray: true
	})
	private readonly items: Club
}

export class CreateClubOk extends ClubDto {
	@ApiProperty({
		type: () => StaffAdminDto,
		isArray: true
	})
	public readonly admins: StaffAdminDto[]
}
export class UpdateClubOk extends Club {}
