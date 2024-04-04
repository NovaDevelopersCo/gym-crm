import { RolesAuthGuard } from '@/auth/guards'
import {
	Controller,
	Get,
	Param,
	Post,
	UsePipes,
	ValidationPipe,
	Body,
	Delete,
	Put
} from '@nestjs/common'
import {
	ApiBearerAuth,
	ApiOperation,
	ApiTags,
	ApiUnauthorizedResponse,
	ApiForbiddenResponse,
	ApiOkResponse,
	ApiBadRequestResponse,
	ApiNoContentResponse
} from '@nestjs/swagger'
import { ClubService } from './club.service'
import { EStaffRole } from '@/core/enums'
import {
	EClubSwaggerMessages,
	GetAllClubsOk,
	GetClubByIdOk,
	UpdateClubOk,
	CreateClubOk
} from './swagger'
import { ESwaggerMessages } from '@/core/swagger'
import { GetByIdParamsDto } from '@/core/dto'
import { CreateClubDto, UpdateClubDto } from './dto'

@ApiTags('Клубы')
@ApiBearerAuth('access-auth')
@UsePipes(new ValidationPipe({ whitelist: true }))
@RolesAuthGuard(EStaffRole.DIRECTOR)
@Controller('club')
export class ClubController {
	constructor(private readonly clubService: ClubService) {}

	@ApiOperation({
		summary: 'Получить список всех клубов',
		description: 'Только с ролью director'
	})
	@ApiOkResponse({ type: GetAllClubsOk, description: 'Найденные клубы' })
	@ApiUnauthorizedResponse({ description: ESwaggerMessages.UNAUTHORIZED })
	@ApiForbiddenResponse({ description: ESwaggerMessages.FORBIDDEN })
	@Get('/')
	getAll() {
		return this.clubService.getAll()
	}

	@ApiOperation({
		summary: 'Получить клуб по id',
		description: 'Только с ролью director'
	})
	@ApiOkResponse({ type: GetClubByIdOk, description: 'Найденный клуб' })
	@ApiUnauthorizedResponse({ description: ESwaggerMessages.UNAUTHORIZED })
	@ApiForbiddenResponse({ description: ESwaggerMessages.FORBIDDEN })
	@ApiBadRequestResponse({ description: EClubSwaggerMessages.GET_BY_ID })
	@Get('/:id')
	getById(@Param() { id }: GetByIdParamsDto) {
		return this.clubService.getById(id)
	}

	@ApiOperation({
		summary: 'Создание нового клуба',
		description: 'Только с ролью director'
	})
	@ApiUnauthorizedResponse({ description: ESwaggerMessages.UNAUTHORIZED })
	@ApiForbiddenResponse({ description: ESwaggerMessages.FORBIDDEN })
	@ApiBadRequestResponse({ description: EClubSwaggerMessages.CREATE })
	@ApiOkResponse({ type: CreateClubOk, description: 'Результат создания' })
	@Post('/')
	create(@Body() dto: CreateClubDto) {
		return this.clubService.create(dto)
	}

	@ApiOperation({ summary: 'Изменить клуб', description: 'Только с ролью director' })
	@ApiUnauthorizedResponse({ description: ESwaggerMessages.UNAUTHORIZED })
	@ApiForbiddenResponse({ description: ESwaggerMessages.FORBIDDEN })
	@ApiBadRequestResponse({ description: EClubSwaggerMessages.UPDATE })
	@ApiOkResponse({ type: UpdateClubOk, description: 'Результат изменения' })
	@Put('/:id')
	update(@Param() { id }: GetByIdParamsDto, @Body() dto: UpdateClubDto) {
		return this.clubService.update(id, dto)
	}

	@ApiNoContentResponse({ description: 'Успешно удалено' })
	@ApiOperation({ summary: 'Удалить клуб', description: 'Только с ролью director' })
	@ApiUnauthorizedResponse({ description: ESwaggerMessages.UNAUTHORIZED })
	@ApiForbiddenResponse({ description: ESwaggerMessages.FORBIDDEN })
	@ApiBadRequestResponse({ description: EClubSwaggerMessages.DELETE })
	@Delete('/:id')
	delete(@Param() { id }: GetByIdParamsDto) {
		return this.clubService.delete(id)
	}
}
