import { ApiProperty } from '@nestjs/swagger'

type TMeta = {
	total: number
}

export class PaginationResponse {
	@ApiProperty({
		default: {
			total: 15
		}
	})
	meta: TMeta
}
