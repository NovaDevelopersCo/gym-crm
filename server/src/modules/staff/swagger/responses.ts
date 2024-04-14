import { ApiProperty } from '@nestjs/swagger'
import { OmitType } from '@nestjs/swagger'
import { CreateStaffDto } from '../dto'

export class StaffDto extends OmitType(CreateStaffDto, ['password']) {
	@ApiProperty({
		default: 1
	})
	id: number
}

export class GetStaffByIdOk extends StaffDto {}

export class CreateStaffOk extends StaffDto {}
