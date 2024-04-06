import { IsString } from 'class-validator'

export class ValidateRefreshDto {
	@IsString({
		message: 'Refresh токен должен быть строкой'
	})
	refresh: string
}
