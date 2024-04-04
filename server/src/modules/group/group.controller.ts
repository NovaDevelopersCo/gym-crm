import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { CreateGroupDto, UpdateGroupDto } from './dto'
import {
	ApiBadRequestResponse,
	ApiBearerAuth,
	ApiForbiddenResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
	ApiUnauthorizedResponse,
	ApiNoContentResponse
} from '@nestjs/swagger'
import { GroupService } from './group.service'
import { RolesAuthGuard } from '@/auth/guards'
import { ESwaggerMessages } from '@/core/swagger'
import { EStaffRole } from '@/core/enums'
import { GetByIdParamsDto } from '@/core/dto'

import {
	EGroupSwaggerMessages,
	CreateGroupOk,
	GetAllGroupsOk,
	GetGroupByIdOk,
	UpdateGroupOk
} from './swagger'

@ApiTags('Группы')
@ApiBearerAuth('access-token')
@UsePipes(new ValidationPipe())
@RolesAuthGuard(EStaffRole.DIRECTOR)
@Controller('group')
export class GroupController {
	constructor(private readonly groupService: GroupService) {}

	@ApiOperation({ summary: 'Получить список всех групп', description: 'Только с ролью director' })
	@ApiOkResponse({ type: GetAllGroupsOk, description: 'Найденные группы' })
	@ApiUnauthorizedResponse({ description: ESwaggerMessages.UNAUTHORIZED })
	@ApiForbiddenResponse({ description: ESwaggerMessages.FORBIDDEN })
	@Get('/')
	getAll() {
		return this.groupService.getAll()
	}

	@ApiOperation({ summary: 'Получить группу по id', description: 'Только с ролью director' })
	@ApiOkResponse({ description: 'Найденная группа', type: GetGroupByIdOk })
	@ApiUnauthorizedResponse({ description: ESwaggerMessages.UNAUTHORIZED })
	@ApiForbiddenResponse({ description: ESwaggerMessages.FORBIDDEN })
	@ApiBadRequestResponse({ description: EGroupSwaggerMessages.GET_BY_ID })
	@Get('/:id')
	getById(@Param() { id }: GetByIdParamsDto) {
		return this.groupService.getById(id)
	}

	@ApiOperation({ summary: 'Создать новую группу', description: 'Только с ролью director' })
	@ApiUnauthorizedResponse({ description: ESwaggerMessages.UNAUTHORIZED })
	@ApiForbiddenResponse({ description: ESwaggerMessages.FORBIDDEN })
	@ApiBadRequestResponse({ description: EGroupSwaggerMessages.CREATE })
	@ApiOkResponse({ description: 'Результат создания', type: CreateGroupOk })
	@Post('/')
	create(@Body() dto: CreateGroupDto) {
		return this.groupService.create(dto)
	}

	@ApiOperation({ summary: 'Изменить группу', description: 'Только с ролью director' })
	@ApiUnauthorizedResponse({ description: ESwaggerMessages.UNAUTHORIZED })
	@ApiForbiddenResponse({ description: ESwaggerMessages.FORBIDDEN })
	@ApiBadRequestResponse({ description: EGroupSwaggerMessages.UPDATE })
	@ApiOkResponse({ description: 'Результат изменения', type: UpdateGroupOk })
	@Put('/:id')
	update(@Param() { id }: GetByIdParamsDto, @Body() dto: UpdateGroupDto) {
		return this.groupService.update(id, dto)
	}

	@HttpCode(204)
	@ApiNoContentResponse({ description: 'Успешно удалено' })
	@ApiOperation({ summary: 'Удалить группу', description: 'Только с ролью direction' })
	@ApiUnauthorizedResponse({ description: ESwaggerMessages.UNAUTHORIZED })
	@ApiForbiddenResponse({ description: ESwaggerMessages.FORBIDDEN })
	@ApiBadRequestResponse({ description: EGroupSwaggerMessages.DELETE })
	@Delete('/:id')
	delete(@Param() { id }: GetByIdParamsDto) {
		return this.groupService.delete(id)
	}
}
