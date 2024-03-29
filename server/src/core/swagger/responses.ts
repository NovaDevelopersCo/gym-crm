import { ApiProperty } from '@nestjs/swagger'
import { ECreateStaffRole } from '../enums'
import { StaffEntity } from '@/modules/staff/entities'

export class AuthOk {
	@ApiProperty({
		default:
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
	})
	accessToken: string
}

export class RefreshOk extends AuthOk {
	@ApiProperty({
		default: {
			name: 'name',
			role: 'admin / trainer',
			email: 'email@email.com',
			id: '35'
		}
	})
	profile: Pick<StaffEntity, 'name' | 'role' | 'email' | 'id'>
}

export class CreateStaffOk {
	@ApiProperty({ enum: ECreateStaffRole, default: 'admin / trainer' })
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
