import { ApiProperty } from '@nestjs/swagger'
import { ECreateStaffRole } from '@/core/enums'

export class CreateStaffOk {
	@ApiProperty({ enum: ECreateStaffRole, default: 'admin' })
	role: ECreateStaffRole

	@ApiProperty({
		default: 'email@email.com'
	})
	email: string

	@ApiProperty({
		default: '35'
	})
	id: string
}
