import { applyDecorators } from '@nestjs/common'
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger'

export const propertiesSwagger = ({
	validation = {},
	example,
	decorators = []
}: {
	validation?: ApiPropertyOptions
	example?: any
	decorators?: any[]
}) =>
	applyDecorators(
		ApiProperty({
			example,
			...validation
		}),
		...decorators.filter(Boolean)
	)
