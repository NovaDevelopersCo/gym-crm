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
import { ApiTags } from '@nestjs/swagger'
import { StaffDocSwagger } from './swagger'
import { GetByIdParamsDto } from '@/core/dto'

@ApiTags('Персонал')
@RolesAuthGuard(EStaffRole.DIRECTOR)
@UseInterceptors(ClassSerializerInterceptor)
@UsePipes(new ValidationPipe({ whitelist: true }))
@Controller('staff')
export class StaffController {
	constructor(private readonly staffService: StaffService) {}

	@StaffDocSwagger.create()
	@Post()
	create(@Body() dto: CreateStaffDto) {
		return this.staffService.create(dto)
	}

	@StaffDocSwagger.getAll()
	@Get()
	getAll(@Query() query: FindAllStaffDto) {
		return this.staffService.getAll(query)
	}

	@StaffDocSwagger.getById()
	@Get(':id')
	getOne(@Param() { id }: GetByIdParamsDto) {
		return this.staffService.getById(id, true)
	}

	@StaffDocSwagger.update()
	@Put(':id')
	update(@Param() { id }: GetByIdParamsDto, @Body() dto: UpdateStaffDto) {
		return this.staffService.update(id, dto)
	}

	@StaffDocSwagger.delete()
	@Delete(':id')
	delete(@Param() { id }: GetByIdParamsDto) {
		return this.staffService.delete(id)
	}
}
