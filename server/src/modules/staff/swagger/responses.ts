import { ApiProperty } from '@nestjs/swagger'
import { OmitType } from '@nestjs/swagger'
import { CreateStaffDto } from '../dto'

export class GetStaffByIdOk extends OmitType(CreateStaffDto, ['password']) {
	@ApiProperty({
		default: 1
	})
	id: number
}

export class CreateStaffOk extends GetStaffByIdOk {}
