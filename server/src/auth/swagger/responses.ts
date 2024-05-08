import { ApiProperty } from '@nestjs/swagger'
import { JwtPayload } from '../dto'

export class RefreshOk {
	@ApiProperty({
		example:
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
	})
	accessToken: string

	@ApiProperty()
	profile: JwtPayload
}
