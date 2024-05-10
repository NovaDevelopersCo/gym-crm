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

export class Property {
	private readonly DEFAULT_OPTIONS_MAP = new Map<string, string>([
		['description', '1'],
		['default', '1'],
		['enum', '1'],
		['example', '1'],
		['isArray', '1'],
		['nullable', '1'],
		['readOnly', '1'],
		['required', '1'],
		['type', '1']
	])

	private decorators = []
	private options: ApiPropertyOptions = {}
	private validation: boolean

	constructor({
		decorators,
		validation,
		...options
	}: ApiPropertyOptions & { decorators?: any[]; validation?: boolean }) {
		this.validation = validation
		if (validation) {
			this.filterOptions(options)
			this.assignDecoratorsByOptions(options, decorators)
		} else {
			this.options = options
		}
	}

	private filterOptions(options: ApiPropertyOptions) {
		this.options = Object.keys(options)
			.filter(i => !!this.DEFAULT_OPTIONS_MAP.get(i))
			.reduce((acc, item) => {
				acc[item] = options[item]
				return acc
			}, {})
	}

	private assignDecoratorsByOptions(options: ApiPropertyOptions, decorators: any[]) {
		const assignedDecorators = []

		if (options.required === false) {
			assignedDecorators.push(IsOptional())
		}

		this.decorators = [assignedDecorators, ...(this.validation ? decorators : [])]
	}

	public exec() {
		return applyDecorators(
			ApiProperty({
				...this.options
			}),
			...this.decorators
		)
	}
}
