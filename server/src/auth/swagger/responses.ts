import { ApiProperty } from '@nestjs/swagger'
import { StaffDto } from '@/modules/staff/swagger'

export class RefreshOk {
	@ApiProperty({
		example:
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
		description: 'Access токен'
	})
	private readonly accessToken: string

	@ApiProperty()
	private readonly profile: StaffDto
}
