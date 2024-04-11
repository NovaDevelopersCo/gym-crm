import {
	Body,
	ClassSerializerInterceptor,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Query,
	UseInterceptors,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { CreateUserDto, FindAllUserDto } from './dto'
import { UserService } from './user.service'
import { ApiTags } from '@nestjs/swagger'
import { RolesAuthGuard } from '@/auth/guards/role.guard'
import { EStaffRole } from '@/core/enums'
import { GetByIdParamsDto } from '@/core/dto'
import { UserDocSwagger } from './swagger'

@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Пользователь')
@RolesAuthGuard(EStaffRole.ADMIN, EStaffRole.DIRECTOR)
@UsePipes(new ValidationPipe({ whitelist: true }))
@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	// * K
	@UserDocSwagger.createQuestionnaireUser()
	@Post()
	createQuestionnaireUser(@Body() dto: CreateUserDto) {
		return this.userService.create(dto)
	}

	// * K
	@UserDocSwagger.getOne()
	@Get(':id')
	findOne(@Param() { id }: GetByIdParamsDto) {
		return this.userService.getById(id)
	}

	// * K
	@UserDocSwagger.update()
	@Put(':id')
	update(@Param() { id }: GetByIdParamsDto, @Body() dto: CreateUserDto) {
		return this.userService.update(id, dto)
	}
	// * K
	@UserDocSwagger.getAll()
	@Get()
	findAll(@Query() query: FindAllUserDto) {
		return this.userService.getAll(query)
	}

	// * K
	@UserDocSwagger.delete()
	@Delete(':id')
	delete(@Param() { id }: GetByIdParamsDto) {
		return this.userService.delete(id)
	}
}
