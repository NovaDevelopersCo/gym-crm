import { IsOptional, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

class ASearchDto {
	public readonly searchBy: string
}

export class SearchDto extends ASearchDto {
	@ApiProperty({
		default: '',
		example: 'Клуб 123',
		required: false,
		description: 'Поиск'
	})
	@IsOptional()
	@IsString({ message: "Параметр 'Поиск' должен быть строкой" })
	public readonly q: string = ''
}
