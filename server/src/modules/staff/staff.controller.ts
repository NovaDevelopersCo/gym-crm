import { Body, Controller, UsePipes, ValidationPipe } from '@nestjs/common'

import { Post } from '@nestjs/common'

import { CreateDto } from './dto'
import { StaffService } from './staff.service'

import { RolesAuthGuard } from '@/auth/guards/role.guard'
import { EStaffRole } from '@/core/enums'

@UsePipes(new ValidationPipe({ whitelist: true }))
@Controller('staff')
export class StaffController {
	constructor(private readonly staffService: StaffService) {}
	@RolesAuthGuard(EStaffRole.DIRECTOR)
	@Post()
	create(@Body() dto: CreateDto) {
		return this.staffService.create(dto)
	}
}
