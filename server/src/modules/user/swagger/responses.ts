import { ApiProperty, PickType } from '@nestjs/swagger'
import { PaginationResponse, IdDto } from '@/core/swagger'
import { ClubDto } from '@/modules/club/swagger'
import { UserDto } from './dto'
import { GroupClubDto } from '@/modules/group/swagger'
import { AbonementDto } from '@/modules/abonement/swagger'
import { OrderDto } from '@/modules/order/swagger'

export class UserReturnSelect extends PickType(UserDto, ['id', 'email', 'fio']) {}
class User extends UserDto {
	@ApiProperty({ isArray: true, type: () => GroupClubDto })
	private readonly groups: GroupClubDto[]

	@ApiProperty()
	public readonly createDate: Date
}

export class CreateUserOk extends User {
	@ApiProperty({
		type: () => IdDto
	})
	private readonly club: IdDto
}

export class GetUserByIdOk extends User {
	@ApiProperty({
		type: () => ClubDto
	})
	public readonly club: ClubDto

	@ApiProperty({
		type: () => AbonementDto,
		isArray: true
	})
	public readonly abonements: AbonementDto[]

	@ApiProperty({
		type: () => OrderDto,
		isArray: true
	})
	public readonly orders: OrderDto
}
export class UpdateUserOk extends User {}
export class GetAllUsersOk extends PaginationResponse {
	@ApiProperty({ isArray: true })
	private readonly items: GetUserByIdOk
}
