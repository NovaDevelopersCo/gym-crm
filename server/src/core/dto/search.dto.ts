import { IsOptional, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

class ASearchDto {
	searchBy: string
}

export class SearchDto extends ASearchDto {
	@ApiProperty({
		default: 'Поиск....',
		required: false,
		description: 'Поиск'
	})
	@IsOptional()
	@IsString({ message: "Параметр 'Поиск' должен быть строкой" })
	q: string = ''
}
