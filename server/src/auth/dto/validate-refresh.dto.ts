import { AuthDecoratorsSwagger } from '../swagger/decorators'

export class ValidateRefreshDto {
	@AuthDecoratorsSwagger.refresh()
	refresh: string
}
