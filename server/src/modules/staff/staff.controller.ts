import { Body, Controller, UsePipes, ValidationPipe, Post } from '@nestjs/common'
import { CreateDto } from './dto'
import { StaffService } from './staff.service'
import { RolesAuthGuard } from '@/auth/guards/role.guard'
import { EStaffRole } from '@/core/enums'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'

import { StaffDocSwagger } from './swagger'

@ApiTags('Управляющие')
@ApiBearerAuth('access-token')
@UsePipes(new ValidationPipe({ whitelist: true }))
@RolesAuthGuard(EStaffRole.DIRECTOR)
@Controller('staff')
export class StaffController {
	constructor(private readonly staffService: StaffService) {}

	@StaffDocSwagger.create()
	@Post()
	create(@Body() dto: CreateDto) {
		return this.staffService.create(dto)
	}
}
