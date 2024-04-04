import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'

import {
	ApiOkResponse,
	ApiOperation,
	ApiTags,
	ApiUnauthorizedResponse,
	ApiForbiddenResponse,
	ApiBadRequestResponse,
	ApiBearerAuth,
	ApiNoContentResponse
} from '@nestjs/swagger'
import {
	EDirectionSwaggerMessages,
	CreateDirectionOk,
	GetAllDirectionsOk,
	GetDirectionByIdOk,
	UpdateDirectionOk
} from './swagger'
import { DirectionService } from './direction.service'
import { CreateDirectionDto, UpdateDirectionDto } from './dto'
import { GetByIdParamsDto } from '@/core/dto'
import { RolesAuthGuard } from '@/auth/guards'
import { EStaffRole } from '@/core/enums'
import { ESwaggerMessages } from '@/core/swagger'

@ApiTags('Направления')
@ApiBearerAuth('access-token')
@UsePipes(new ValidationPipe({ whitelist: true }))
@RolesAuthGuard(EStaffRole.DIRECTOR)
@Controller('direction')
export class DirectionController {
	constructor(private readonly directionService: DirectionService) {}

	@ApiOperation({
		summary: 'Получить список всех направлений',
		description: 'Только с ролью director'
	})
	@ApiOkResponse({ description: 'Найденные направления', type: GetAllDirectionsOk })
	@ApiUnauthorizedResponse({ description: ESwaggerMessages.UNAUTHORIZED })
	@ApiForbiddenResponse({ description: ESwaggerMessages.FORBIDDEN })
	@Get('/')
	async getAll() {
		return this.directionService.getAll()
	}

	@ApiOperation({ summary: 'Получить направление по id', description: 'Только с ролью director' })
	@ApiOkResponse({ description: 'Найденное направление', type: GetDirectionByIdOk })
	@ApiUnauthorizedResponse({ description: ESwaggerMessages.UNAUTHORIZED })
	@ApiForbiddenResponse({ description: ESwaggerMessages.FORBIDDEN })
	@ApiBadRequestResponse({ description: EDirectionSwaggerMessages.GET_BY_ID })
	@Get('/:id')
	getById(@Param() { id }: GetByIdParamsDto) {
		return this.directionService.getById(id)
	}

	@ApiOperation({ summary: 'Создать новое направление', description: 'Только с ролью director' })
	@ApiOkResponse({ description: 'Результат создания', type: CreateDirectionOk })
	@ApiUnauthorizedResponse({ description: ESwaggerMessages.UNAUTHORIZED })
	@ApiForbiddenResponse({ description: ESwaggerMessages.FORBIDDEN })
	@ApiBadRequestResponse({ description: EDirectionSwaggerMessages.CREATE })
	@Post('/')
	create(@Body() dto: CreateDirectionDto) {
		return this.directionService.create(dto)
	}

	@ApiOperation({ summary: 'Изменить направление', description: 'Только с ролью director' })
	@ApiOkResponse({ description: 'Результат изменения', type: UpdateDirectionOk })
	@ApiUnauthorizedResponse({ description: ESwaggerMessages.UNAUTHORIZED })
	@ApiForbiddenResponse({ description: ESwaggerMessages.FORBIDDEN })
	@ApiBadRequestResponse({ description: EDirectionSwaggerMessages.UPDATE })
	@Put('/:id')
	update(@Param() { id }: GetByIdParamsDto, @Body() dto: UpdateDirectionDto) {
		return this.directionService.update(id, dto)
	}

	@ApiNoContentResponse({ description: 'Успешно удалено' })
	@ApiOperation({ summary: 'Удалить направление', description: 'Только с ролью director' })
	@ApiUnauthorizedResponse({ description: ESwaggerMessages.UNAUTHORIZED })
	@ApiForbiddenResponse({ description: ESwaggerMessages.FORBIDDEN })
	@ApiBadRequestResponse({ description: EDirectionSwaggerMessages.DELETE })
	@Delete('/:id')
	delete(@Param() { id }: GetByIdParamsDto) {
		return this.directionService.delete(id)
	}
}
