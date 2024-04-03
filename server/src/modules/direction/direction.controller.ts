import { Controller, Get, Param, UsePipes, ValidationPipe } from '@nestjs/common'

import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { DirectionService } from './direction.service'
import { GetByIdDto } from './dto'

@ApiTags('Направления')
@UsePipes(new ValidationPipe({ whitelist: true }))
@Controller('direction')
export class DirectionController {
	constructor(private readonly directionService: DirectionService) {}
	@ApiOperation({ summary: 'Получить список всех направлений' })
	@Get('/')
	async getAll() {
		return this.directionService.getAll()
	}

	@ApiOperation({ summary: 'Получить направление по id' })
	@Get('/:id')
	getById(@Param() { id }: GetByIdDto) {
		return this.directionService.getById(+id)
	}
}
