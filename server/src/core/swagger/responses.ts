import { ApiProperty } from '@nestjs/swagger'

export class MetaPagination {
	@ApiProperty()
	total: number
}
