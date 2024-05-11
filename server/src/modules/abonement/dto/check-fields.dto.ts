import { CreateAbonementDto } from './create.dto'
import { BadRequestException } from '@nestjs/common'

export class AbonementCheckFields {
	constructor({ duration, count }: CreateAbonementDto) {
		if (duration && count) {
			throw new BadRequestException('Абонемент должен быть одного типа')
		}

		if (!duration && !count) {
			throw new BadRequestException('Абонемент должен быть хотя бы одного типа')
		}
	}
}
