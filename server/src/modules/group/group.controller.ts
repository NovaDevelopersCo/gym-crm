import {
	Body,
	ClassSerializerInterceptor,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	Query,
	UseInterceptors,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { CreateGroupDto, UpdateGroupDto, FindAllGroupDto } from './dto'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { GroupService } from './group.service'
import { RolesAuthGuard } from '@/auth/guards'
import { EStaffRole } from '@/core/enums'
import { GetByIdParamsDto } from '@/core/dto'
import { GroupDocSwagger } from './swagger'

@ApiTags('Группы')
@ApiBearerAuth('access-token')
@UsePipes(new ValidationPipe({ whitelist: true }))
@RolesAuthGuard(EStaffRole.DIRECTOR)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('group')
export class GroupController {
	constructor(private readonly groupService: GroupService) {}

	@GroupDocSwagger.getAll()
	@Get()
	getAll(@Query() query: FindAllGroupDto) {
		return this.groupService.getAll(query)
	}

	@GroupDocSwagger.getById()
	@Get(':id')
	getById(@Param() { id }: GetByIdParamsDto) {
		return this.groupService.getById(id)
	}

	@GroupDocSwagger.create()
	@Post()
	create(@Body() dto: CreateGroupDto) {
		return this.groupService.create(dto)
	}

	@GroupDocSwagger.update()
	@Put(':id')
	update(@Param() { id }: GetByIdParamsDto, @Body() dto: UpdateGroupDto) {
		return this.groupService.update(id, dto)
	}

	@GroupDocSwagger.delete()
	@HttpCode(204)
	@Delete(':id')
	delete(@Param() { id }: GetByIdParamsDto) {
		return this.groupService.delete(id)
	}
}
