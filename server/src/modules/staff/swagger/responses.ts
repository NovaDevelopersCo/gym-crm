import { ApiProperty, OmitType } from '@nestjs/swagger'
import { PaginationResponse } from '@/core/swagger'
import { StaffDto, StaffAdminDto } from './dto'
import { ClubDto } from '@/modules/club/swagger'

class Staff extends StaffDto {
	@ApiProperty({ nullable: true, type: () => ClubDto })
	public readonly club: ClubDto[]
}

export class CreateStaffOk extends StaffAdminDto {}

export class UpdateStaffOk extends OmitType(Staff, ['club']) {}

export class GetStaffByIdOk extends Staff {}

export class GetAllStaffsOk extends PaginationResponse {
	@ApiProperty({ isArray: true })
	private readonly items: GetStaffByIdOk
}
