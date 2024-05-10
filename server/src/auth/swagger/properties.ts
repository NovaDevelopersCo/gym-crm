import { Property } from '@/core/utils'
import { StaffEntity } from '@/modules/staff/entities'

export class SessionPropertiesSwagger {
	public static user() {
		return new Property({
			description: 'Пользователь',
			type: () => StaffEntity
		}).exec()
	}

	public static token() {
		return new Property({
			description: 'Refresh токен',
			example:
				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
		}).exec()
	}
}
