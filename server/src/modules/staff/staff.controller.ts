import { Body, Controller, UsePipes, ValidationPipe, Post } from '@nestjs/common'

import { CreateDto } from './dto'
import { StaffService } from './staff.service'

import { CreateStaffOk, ESwaggerMessages } from '@/core/swagger'

import { ApiForbiddenResponse } from '@nestjs/swagger'

import { RolesAuthGuard } from '@/auth/guards/role.guard'
import { EStaffRole } from '@/core/enums'
import { ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger'

@ApiTags('Управляющие')
@UsePipes(new ValidationPipe({ whitelist: true }))
@Controller('staff')
@ApiOkResponse()
export class StaffController {
	constructor(private readonly staffService: StaffService) {}
	@ApiOperation({
		summary: 'Создание нового профиля для управляющего',
		description: 'Только с ролью director'
	})
	@ApiOkResponse({ description: 'Созданный профиль', type: CreateStaffOk })
	@ApiUnauthorizedResponse({ description: ESwaggerMessages.UNAUTHORIZED })
	@ApiForbiddenResponse({ description: ESwaggerMessages.FORBIDDEN })
	@RolesAuthGuard(EStaffRole.DIRECTOR)
	@Post()
	create(@Body() dto: CreateDto) {
		return this.staffService.create(dto)
	}
}
