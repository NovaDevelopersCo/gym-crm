import { ApiProperty } from '@nestjs/swagger'
import { OmitType, PickType } from '@nestjs/swagger'
import { CreateStaffDto } from '../dto'

export class GetStaffByIdOk extends OmitType(CreateStaffDto, ['password']) {
	@ApiProperty({
		default: 1
	})
	id: number
}

export class CreateStaffOk extends PickType(GetStaffByIdOk, ['role', 'email', 'id']) {}
