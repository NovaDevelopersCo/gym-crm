import { ApiProperty, OmitType } from '@nestjs/swagger'
import { StaffClub } from '@/modules/club/swagger'
import { CreateStaffDto } from '../dto'
import { PaginationResponse } from '@/core/swagger'

export class StaffDto extends OmitType(CreateStaffDto, ['password']) {
	@ApiProperty({
		default: 35
	})
	id: number
}

export class GetStaffByIdOk extends StaffDto {
	@ApiProperty({ nullable: true })
	club: StaffClub
}

export class GetAllStaffsOk extends PaginationResponse {
	@ApiProperty({ isArray: true })
	items: GetStaffByIdOk
}
