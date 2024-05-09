import { applyDecorators } from '@nestjs/common'
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger'
import { IsOptional } from 'class-validator'

type TDefaultOptionsItem = keyof ApiPropertyOptions

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

class Property {
	private readonly DEFAULT_OPTIONS: TDefaultOptionsItem[] = [
		'description',
		'default',
		'enum',
		'example',
		'isArray',
		'nullable',
		'readOnly',
		'required',
		'type'
	]

	private decorators = []
	private options: ApiPropertyOptions = {}

	constructor({
		decorators,
		validation,
		...options
	}: ApiPropertyOptions & { decorators?: any[]; validation?: boolean }) {
		if (validation) {
			this.filterOptions(options)
			this.assignDecoratorsByOptions(options, decorators)
		} else {
			this.options = options
		}
	}

	private filterOptions(options: ApiPropertyOptions) {
		const optionsMap = new Map<string, ApiPropertyOptions>()

		Object.keys(options).forEach(i => {
			if (this.DEFAULT_OPTIONS.includes(options[i])) {
				optionsMap.set(i, options[i])
			}
		})

		this.options = Object.fromEntries(optionsMap)
	}

	private assignDecoratorsByOptions(options: ApiPropertyOptions, decorators: any[]) {
		const assignedDecorators = [...decorators]

		if (options.required === false) {
			assignedDecorators.push(IsOptional())
		}

		this.decorators = assignedDecorators
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

new Property({
	decorators: [IsOptional()],
	validation: true,
	example: 3,
	description: 'Тест'
}) // пример использования
