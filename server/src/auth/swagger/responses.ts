import { ApiProperty } from '@nestjs/swagger'
import { EStaffRole } from '@/core/enums'

class Profile {
	@ApiProperty()
	fio: string

	@ApiProperty({
		enum: EStaffRole
	})
	role: EStaffRole

	@ApiProperty()
	email: string

	@ApiProperty()
	id: string
}

export class RefreshOk {
	@ApiProperty({
		default:
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
	})
	accessToken: string
	@ApiProperty({
		default: {
			fio: 'Васильев Василий Васильевич',
			role: 'admin',
			email: 'email@email.com',
			id: '35'
		}
	})
	profile: Profile
}
