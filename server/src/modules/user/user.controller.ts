import {
	Body,
	Controller,
	Get,
	HttpCode,
	Post,
	Query,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { PaginationUserQueryDto, QuestionnaireUserDto } from './dto'
import { UserService } from './user.service'
import {
	ApiBadRequestResponse,
	ApiBearerAuth,
	ApiCreatedResponse,
	ApiForbiddenResponse,
	ApiOperation,
	ApiTags,
	ApiUnauthorizedResponse
} from '@nestjs/swagger'
import { RolesAuthGuard } from '@/auth/guards/role.guard'
import { EStaffRole } from '@/core/enums'
import { ESwaggerMessages, ResponseUserDto } from '@/core/swagger'

@ApiTags('Пользователь')
@UsePipes(new ValidationPipe({ whitelist: true }))
@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@ApiBearerAuth('access-token')
	@ApiOperation({
		summary: 'Анкета регистрации пользователя',
		description: 'Только с ролями Admin и Director'
	})
	@ApiUnauthorizedResponse({ description: ESwaggerMessages.UNAUTHORIZED })
	@ApiForbiddenResponse({ description: ESwaggerMessages.FORBIDDEN })
	@ApiBadRequestResponse({ description: ESwaggerMessages.ERROR_VALIDATION })
	@ApiCreatedResponse({ description: 'Пользователь успешно добавлен', type: ResponseUserDto })
	@RolesAuthGuard(EStaffRole.ADMIN, EStaffRole.DIRECTOR)
	@HttpCode(201)
	@Post()
	createQuestionnaireUser(@Body() dto: QuestionnaireUserDto) {
		return this.userService.createQuestionnaireUser(dto)
	}

	// !NotWork
	@HttpCode(200)
	@Get()
	findAll(@Query() query: PaginationUserQueryDto) {
		return this.userService.findAll(query)
	}
}
