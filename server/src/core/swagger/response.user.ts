import { ApiProperty } from '@nestjs/swagger'

export class ResponseUserDto {
	@ApiProperty()
	fio: string

	@ApiProperty()
	phone: number

	@ApiProperty()
	email: string

	@ApiProperty()
	id: number
}
