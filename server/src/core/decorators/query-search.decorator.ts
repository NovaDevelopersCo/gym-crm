import { applyDecorators } from '@nestjs/common'
import { IsEnum, IsOptional } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export const QuerySearch = (eList: object, description: string, message: string) => {
	return applyDecorators(
		ApiProperty({ required: false, description, enum: eList }),
		IsOptional(),
		IsEnum(eList, { message })
	)
}
