import { PaginationQueryDto } from '@/core/pagination'
import { ApiProperty } from '@nestjs/swagger'
import { AbonementDto, UserAbonementDto } from './dto'
import { ClubDto } from '@/modules/club/swagger'
import { IdDto } from '@/core/swagger'
import { UserReturnSelect } from '@/modules/user/swagger'

class Abonement extends AbonementDto {
	@ApiProperty({
		isArray: true,
		type: () => ClubDto
	})
	public readonly clubs: ClubDto
}

export class GetAbonementByIdOk extends Abonement {}
export class CreateAbonementOk extends Abonement {}
export class UpdateAbonementOk extends Abonement {}
export class GetAllAbonementsOk extends PaginationQueryDto {
	@ApiProperty({
		isArray: true
	})
	private readonly items: Abonement
}

class UserAbonement extends UserAbonementDto {
	@ApiProperty({
		type: () => AbonementDto
	})
	public readonly abonement: AbonementDto

	@ApiProperty({
		type: () => UserReturnSelect
	})
	public readonly user: UserReturnSelect
}

export class GetUserAbonementByIdOk extends UserAbonement {}
export class CreateUserAbonementOk extends UserAbonementDto {
	@ApiProperty({
		type: () => IdDto
	})
	public readonly abonement: IdDto

	@ApiProperty({
		type: () => IdDto
	})
	public readonly user: IdDto
}
export class GetAllUserAbonementsOk extends PaginationQueryDto {
	@ApiProperty({
		isArray: true
	})
	private readonly items: UserAbonement
}
