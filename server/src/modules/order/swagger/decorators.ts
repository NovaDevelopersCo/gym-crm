import { applyDecorators } from '@nestjs/common'
import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'
import { ArrayNotEmpty, IsArray, IsPositive, ValidateNested } from 'class-validator'
import { ProductWithCount } from '../dto'

export class OrderDecoratorsSwagger {
	static productCountObject(withValidation?: boolean) {
		const decorators = []

		if (withValidation) {
			decorators.push(
				ValidateNested({ each: true }),
				ArrayNotEmpty(),
				IsArray(),
				Type(() => ProductWithCount)
			)
		}
		return applyDecorators(
			ApiProperty({ isArray: true, example: [{ id: 2, count: 3 }] }),
			...decorators
		)
	}

	static count(withValidation?: boolean) {
		const decorators = []
		if (withValidation) {
			decorators.push(
				IsPositive({ message: 'Количество товара должно быть положительным числом' })
			)
		}

		return applyDecorators(
			ApiProperty({
				example: 2
			}),
			...decorators
		)
	}
}
