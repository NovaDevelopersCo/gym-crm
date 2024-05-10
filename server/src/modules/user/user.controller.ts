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
import { CreateUserDto, FindAllUserDto, UpdateUserDto } from './dto'
import { UserService } from './user.service'
import { ApiTags } from '@nestjs/swagger'
import { RolesAuthGuard } from '@/auth/guards/role.guard'
import { EStaffRole } from '@/core/enums'
import { GetByIdParamsDto } from '@/core/dto'
import { UserDocSwagger } from './swagger'
import { Staff } from '@/core/decorators'

@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Пользователи')
@RolesAuthGuard(EStaffRole.ADMIN, EStaffRole.DIRECTOR)
@UsePipes(new ValidationPipe({ whitelist: true }))
@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@UserDocSwagger.create()
	@Post()
	public createQuestionnaireUser(@Body() dto: CreateUserDto) {
		return this.userService.create(dto)
	}

	@UserDocSwagger.getById()
	@Get(':id')
	public findOne(@Param() { id }: GetByIdParamsDto, @Staff('id') staffId: number) {
		return this.userService.getById(id, staffId)
	}

	@UserDocSwagger.update()
	@Put(':id')
	public update(@Param() { id }: GetByIdParamsDto, @Body() dto: UpdateUserDto) {
		return this.userService.update(id, dto)
	}

	@UserDocSwagger.getAll()
	@Get()
	public findAll(@Query() query: FindAllUserDto, @Staff('id') staffId: number) {
		return this.userService.getAll(staffId, query)
	}

	@UserDocSwagger.delete()
	@Delete(':id')
	public delete(@Param() { id }: GetByIdParamsDto) {
		return this.userService.delete(id)
	}
}
