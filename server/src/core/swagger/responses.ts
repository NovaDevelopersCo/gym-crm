import { ApiProperty } from '@nestjs/swagger'

class MetaDto {
	@ApiProperty({
		example: 15
	})
	total: number
}

export class PaginationResponse {
	@ApiProperty()
	meta: MetaDto
}
