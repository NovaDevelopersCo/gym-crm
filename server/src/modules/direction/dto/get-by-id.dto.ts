import { Matches } from 'class-validator'

export class GetByIdDto {
	@Matches(/^\d+$/, { message: 'Id направления должно быть числом' })
	id: string
}
