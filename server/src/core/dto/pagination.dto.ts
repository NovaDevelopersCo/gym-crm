import { ApiProperty } from '@nestjs/swagger'

type TMeta = {
	total: number
}

export class PaginationDto {
	@ApiProperty({
		default: {
			total: 15
		}
	})
	meta: TMeta
}
