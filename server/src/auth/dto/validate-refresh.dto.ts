import { IsString } from 'class-validator'

export class ValidateRefreshDto {
	@IsString()
	refresh: string
}
