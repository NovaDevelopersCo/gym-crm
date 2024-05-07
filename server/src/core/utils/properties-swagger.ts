import { applyDecorators } from '@nestjs/common'
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger'
import { IsOptional } from 'class-validator'

export const propertiesSwagger = ({
	decorators = [],
	...options
}: ApiPropertyOptions & { decorators?: any[] }) => {
	const decoratorsBody = [...decorators]

	if (options.required === false) {
		decoratorsBody.push(IsOptional())
	}

	return applyDecorators(
		ApiProperty({
			...options
		}),
		...decoratorsBody
	)
}
