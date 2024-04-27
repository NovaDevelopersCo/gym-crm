import { applyDecorators } from '@nestjs/common'
import { IsString } from 'class-validator'

export class AuthDecoratorsSwagger {
	static refresh() {
		return applyDecorators(
			IsString({
				message: 'Refresh токен должен быть строкой'
			})
		)
	}
}
