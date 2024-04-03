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
	ApiBearerAuth
} from '@nestjs/swagger'
import { DirectionService } from './direction.service'
import { CreateDirectionDto, UpdateDirectionDto } from './dto'
import { GetByIdParamsDto } from '@/core/dto'
import { RolesAuthGuard } from '@/auth/guards'
import { EStaffRole } from '@/core/enums'
import {
	CreateDirectionOk,
	DeleteDirectionOk,
	ESwaggerMessages,
	GetAllDirections,
	GetDirectionById,
	UpdateDirectionOk
} from '@/core/swagger'

@ApiTags('Направления')
@UsePipes(new ValidationPipe({ whitelist: true }))
@Controller('direction')
export class DirectionController {
	constructor(private readonly directionService: DirectionService) {}
	@ApiBearerAuth('access-token')
	@ApiOperation({
		summary: 'Получить список всех направлений',
		description: 'Только с ролью director'
	})
	@ApiOkResponse({ description: 'Найденные направления', type: GetAllDirections })
	@ApiUnauthorizedResponse({ description: ESwaggerMessages.UNAUTHORIZED })
	@ApiForbiddenResponse({ description: ESwaggerMessages.FORBIDDEN })
	@RolesAuthGuard(EStaffRole.DIRECTOR)
	@Get('/')
	async getAll() {
		return this.directionService.getAll()
	}

	@ApiBearerAuth('access-token')
	@ApiOperation({ summary: 'Получить направление по id', description: 'Только с ролью director' })
	@ApiOkResponse({ description: 'Найденное направление', type: GetDirectionById })
	@ApiUnauthorizedResponse({ description: ESwaggerMessages.UNAUTHORIZED })
	@ApiForbiddenResponse({ description: ESwaggerMessages.FORBIDDEN })
	@ApiBadRequestResponse({ description: ESwaggerMessages.DIRECTION_GET_BY_ID })
	@RolesAuthGuard(EStaffRole.DIRECTOR)
	@Get('/:id')
	getById(@Param() { id }: GetByIdParamsDto) {
		return this.directionService.getById(+id)
	}

	@ApiBearerAuth('access-token')
	@ApiOperation({ summary: 'Создать новое направление', description: 'Только с ролью director' })
	@ApiOkResponse({ description: 'Результат создания', type: CreateDirectionOk })
	@ApiUnauthorizedResponse({ description: ESwaggerMessages.UNAUTHORIZED })
	@ApiForbiddenResponse({ description: ESwaggerMessages.FORBIDDEN })
	@ApiBadRequestResponse({ description: ESwaggerMessages.DIRECTION_CREATE })
	@RolesAuthGuard(EStaffRole.DIRECTOR)
	@Post('/')
	create(@Body() dto: CreateDirectionDto) {
		return this.directionService.create(dto)
	}

	@ApiBearerAuth('access-token')
	@ApiOperation({ summary: 'Изменить направление', description: 'Только с ролью director' })
	@ApiOkResponse({ description: 'Результат изменения', type: UpdateDirectionOk })
	@ApiUnauthorizedResponse({ description: ESwaggerMessages.UNAUTHORIZED })
	@ApiForbiddenResponse({ description: ESwaggerMessages.FORBIDDEN })
	@ApiBadRequestResponse({ description: ESwaggerMessages.DIRECTION_UPDATE })
	@RolesAuthGuard(EStaffRole.DIRECTOR)
	@Put('/:id')
	update(@Param() { id }: GetByIdParamsDto, @Body() dto: UpdateDirectionDto) {
		return this.directionService.update(+id, dto)
	}

	@ApiBearerAuth('access-token')
	@ApiOperation({ summary: 'Удалить направление', description: 'Только с ролью director' })
	@ApiOkResponse({ description: 'Результат удаления', type: DeleteDirectionOk })
	@ApiUnauthorizedResponse({ description: ESwaggerMessages.UNAUTHORIZED })
	@ApiForbiddenResponse({ description: ESwaggerMessages.FORBIDDEN })
	@ApiBadRequestResponse({ description: ESwaggerMessages.DIRECTION_DELETE })
	@RolesAuthGuard(EStaffRole.DIRECTOR)
	@Delete('/:id')
	delete(@Param() { id }: GetByIdParamsDto) {
		return this.directionService.delete(+id)
	}
}
