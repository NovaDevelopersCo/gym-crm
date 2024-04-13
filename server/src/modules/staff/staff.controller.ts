import {
	Body,
	Controller,
	UsePipes,
	ValidationPipe,
	Post,
	Get,
	Put,
	Delete,
	Param,
	Query,
	UseInterceptors,
	ClassSerializerInterceptor
} from '@nestjs/common'
import { CreateStaffDto, UpdateStaffDto, FindAllStaffDto } from './dto'
import { StaffService } from './staff.service'
import { RolesAuthGuard } from '@/auth/guards/role.guard'
import { EStaffRole } from '@/core/enums'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'
import { StaffDocSwagger } from './swagger'
import { GetByIdParamsDto } from '@/core/dto'

@ApiTags('Персонал')
@UseInterceptors(ClassSerializerInterceptor)
@ApiBearerAuth('access-token')
@UsePipes(new ValidationPipe({ whitelist: true }))
@Controller('staff')
export class StaffController {
	constructor(private readonly staffService: StaffService) {}

	@RolesAuthGuard(EStaffRole.DIRECTOR)
	@StaffDocSwagger.create()
	@Post()
	create(@Body() dto: CreateStaffDto) {
		return this.staffService.create(dto)
	}

	@RolesAuthGuard(EStaffRole.DIRECTOR)
	@StaffDocSwagger.getAll()
	@Get()
	getAll(@Query() query: FindAllStaffDto) {
		return this.staffService.getAll(query)
	}

	@RolesAuthGuard(EStaffRole.DIRECTOR)
	@StaffDocSwagger.getById()
	@Get(':id')
	getOne(@Param() { id }: GetByIdParamsDto) {
		return this.staffService.getById(id, true)
	}

	@RolesAuthGuard(EStaffRole.DIRECTOR)
	@StaffDocSwagger.update()
	@Put(':id')
	update(@Param() { id }: GetByIdParamsDto, @Body() dto: UpdateStaffDto) {
		return this.staffService.update(id, dto)
	}

	@RolesAuthGuard(EStaffRole.DIRECTOR)
	@StaffDocSwagger.delete()
	@Delete(':id')
	delete(@Param() { id }: GetByIdParamsDto) {
		return this.staffService.delete(id)
	}
}
