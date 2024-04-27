import { applyDecorators } from '@nestjs/common'
import { IsEnum, IsOptional } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { QuerySearchValidate } from './query-search-validate.decorator'

import type { TQuerySearchValidatorObj } from '@/core/types'

// * for swagger
export const QuerySearch = <T extends string = ''>(
	eList: object,
	description: string,
	message: string,
	validator?: TQuerySearchValidatorObj<T>
) => {
	const decorators = [
		ApiProperty({ required: false, description, enum: eList }),
		IsOptional(),
		IsEnum(eList, { message })
	]

	if (validator) {
		decorators.push(QuerySearchValidate<T>(validator))
	}

	return applyDecorators(...decorators)
}
