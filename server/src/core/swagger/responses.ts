import { ApiProperty } from '@nestjs/swagger'

class MetaDto {
	@ApiProperty({
		example: 15
	})
	public readonly total: number
}

export class PaginationResponse {
	@ApiProperty()
	public readonly meta: MetaDto
}
