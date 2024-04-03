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
import { CreateGroupDto, UpdateGroupDto } from './dto'
import {
	ApiBadRequestResponse,
	ApiBearerAuth,
	ApiForbiddenResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
	ApiUnauthorizedResponse
} from '@nestjs/swagger'
import { GroupService } from './group.service'
import { RolesAuthGuard } from '@/auth/guards'
import {
	CreateGroupOk,
	DeleteOk,
	ESwaggerMessages,
	GetAllGroupsOk,
	GetGroupByIdOk,
	UpdateGroupOk
} from '@/core/swagger'
import { EStaffRole } from '@/core/enums'
import { GetByIdParamsDto } from '@/core/dto'

@ApiTags('Группы')
@UsePipes(new ValidationPipe())
@Controller('group')
export class GroupController {
	constructor(private readonly groupService: GroupService) {}

	@ApiBearerAuth('access-token')
	@ApiOperation({ summary: 'Получить список всех групп', description: 'Только с ролью director' })
	@ApiOkResponse({ type: GetAllGroupsOk, description: 'Найденные группы' })
	@ApiUnauthorizedResponse({ description: ESwaggerMessages.UNAUTHORIZED })
	@ApiForbiddenResponse({ description: ESwaggerMessages.FORBIDDEN })
	@RolesAuthGuard(EStaffRole.DIRECTOR)
	@Get('/')
	getAll() {
		return this.groupService.getAll()
	}

	@ApiBearerAuth('access-token')
	@ApiOperation({ summary: 'Получить группу по id', description: 'Только с ролью director' })
	@ApiOkResponse({ description: 'Найденная группа', type: GetGroupByIdOk })
	@ApiUnauthorizedResponse({ description: ESwaggerMessages.UNAUTHORIZED })
	@ApiForbiddenResponse({ description: ESwaggerMessages.FORBIDDEN })
	@ApiBadRequestResponse({ description: ESwaggerMessages.GROUP_GET_BY_ID })
	@RolesAuthGuard(EStaffRole.DIRECTOR)
	@Get('/:id')
	getById(@Param() { id }: GetByIdParamsDto) {
		return this.groupService.getById(+id)
	}

	@ApiBearerAuth('access-token')
	@ApiOperation({ summary: 'Создать новую группу', description: 'Только с ролью director' })
	@ApiUnauthorizedResponse({ description: ESwaggerMessages.UNAUTHORIZED })
	@ApiForbiddenResponse({ description: ESwaggerMessages.FORBIDDEN })
	@ApiBadRequestResponse({ description: ESwaggerMessages.GROUP_CREATE })
	@ApiOkResponse({ description: 'Результат создания', type: CreateGroupOk })
	@RolesAuthGuard(EStaffRole.DIRECTOR)
	@Post('/')
	create(@Body() dto: CreateGroupDto) {
		return this.groupService.create(dto)
	}

	@ApiBearerAuth('access-token')
	@ApiOperation({ summary: 'Изменить группу', description: 'Только с ролью director' })
	@ApiUnauthorizedResponse({ description: ESwaggerMessages.UNAUTHORIZED })
	@ApiForbiddenResponse({ description: ESwaggerMessages.FORBIDDEN })
	@ApiBadRequestResponse({ description: ESwaggerMessages.GROUP_UPDATE })
	@ApiOkResponse({ description: 'Результат изменения', type: UpdateGroupOk })
	@RolesAuthGuard(EStaffRole.DIRECTOR)
	@Put('/:id')
	update(@Param() { id }: GetByIdParamsDto, @Body() dto: UpdateGroupDto) {
		return this.groupService.update(+id, dto)
	}

	@ApiBearerAuth('access-token')
	@ApiOperation({ summary: 'Удалить группу', description: 'Только с ролью direction' })
	@ApiOkResponse({ description: 'Результат удаления', type: DeleteOk })
	@ApiUnauthorizedResponse({ description: ESwaggerMessages.UNAUTHORIZED })
	@ApiForbiddenResponse({ description: ESwaggerMessages.FORBIDDEN })
	@ApiBadRequestResponse({ description: ESwaggerMessages.GROUP_DELETE })
	@RolesAuthGuard(EStaffRole.DIRECTOR)
	@Delete('/:id')
	delete(@Param() { id }: GetByIdParamsDto) {
		return this.groupService.delete(+id)
	}
}
