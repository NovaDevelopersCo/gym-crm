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
	ApiBadRequestResponse
} from '@nestjs/swagger'
import { ClubService } from './club.service'
import { EStaffRole } from '@/core/enums'
import {
	ESwaggerMessages,
	GetClubByIdOk,
	CreateClubOk,
	DeleteOk,
	GetAllClubsOk,
	UpdateClubOk
} from '@/core/swagger'
import { GetByIdParamsDto } from '@/core/dto'
import { CreateClubDto, UpdateClubDto } from './dto'

@ApiTags('Клубы')
@UsePipes(new ValidationPipe({ whitelist: true }))
@Controller('club')
export class ClubController {
	constructor(private readonly clubService: ClubService) {}
	@ApiBearerAuth('access-token')
	@ApiOperation({
		summary: 'Получить список всех клубов',
		description: 'Только с ролью director'
	})
	@ApiOkResponse({ type: GetAllClubsOk, description: 'Найденные клубы' })
	@ApiUnauthorizedResponse({ description: ESwaggerMessages.UNAUTHORIZED })
	@ApiForbiddenResponse({ description: ESwaggerMessages.FORBIDDEN })
	@RolesAuthGuard(EStaffRole.DIRECTOR)
	@Get('/')
	getAll() {
		return this.clubService.getAll()
	}

	@ApiBearerAuth('access-token')
	@ApiOperation({
		summary: 'Получить клуб по id',
		description: 'Только с ролью director'
	})
	@ApiOkResponse({ type: GetClubByIdOk, description: 'Найденный клуб' })
	@ApiUnauthorizedResponse({ description: ESwaggerMessages.UNAUTHORIZED })
	@ApiForbiddenResponse({ description: ESwaggerMessages.FORBIDDEN })
	@ApiBadRequestResponse({ description: ESwaggerMessages.CLUB_GET_BY_ID })
	@RolesAuthGuard(EStaffRole.DIRECTOR)
	@Get('/:id')
	getById(@Param() { id }: GetByIdParamsDto) {
		return this.clubService.getById(+id)
	}

	@ApiBearerAuth('access-token')
	@ApiOperation({
		summary: 'Создание нового клуба',
		description: 'Только с ролью director'
	})
	@ApiUnauthorizedResponse({ description: ESwaggerMessages.UNAUTHORIZED })
	@ApiForbiddenResponse({ description: ESwaggerMessages.FORBIDDEN })
	@ApiBadRequestResponse({ description: ESwaggerMessages.CLUB_CREATE })
	@ApiOkResponse({ type: CreateClubOk, description: 'Результат создания' })
	@RolesAuthGuard(EStaffRole.DIRECTOR)
	@Post('/')
	create(@Body() dto: CreateClubDto) {
		return this.clubService.create(dto)
	}

	@ApiBearerAuth('access-token')
	@ApiOperation({ summary: 'Изменить клуб', description: 'Только с ролью director' })
	@ApiUnauthorizedResponse({ description: ESwaggerMessages.UNAUTHORIZED })
	@ApiForbiddenResponse({ description: ESwaggerMessages.FORBIDDEN })
	@ApiBadRequestResponse({ description: ESwaggerMessages.CLUB_UPDATE })
	@ApiOkResponse({ type: UpdateClubOk, description: 'Результат изменения' })
	@RolesAuthGuard(EStaffRole.DIRECTOR)
	@Put('/:id')
	update(@Param() { id }: GetByIdParamsDto, @Body() dto: UpdateClubDto) {
		return this.clubService.update(+id, dto)
	}

	@ApiBearerAuth('access-auth')
	@ApiOperation({ summary: 'Удалить клуб', description: 'Только с ролью director' })
	@ApiOkResponse({ description: 'Результат удаления', type: DeleteOk })
	@ApiUnauthorizedResponse({ description: ESwaggerMessages.UNAUTHORIZED })
	@ApiForbiddenResponse({ description: ESwaggerMessages.FORBIDDEN })
	@ApiBadRequestResponse({ description: ESwaggerMessages.CLUB_DELETE })
	@RolesAuthGuard(EStaffRole.DIRECTOR)
	@Delete('/:id')
	delete(@Param() { id }: GetByIdParamsDto) {
		return this.clubService.delete(+id)
	}
}
