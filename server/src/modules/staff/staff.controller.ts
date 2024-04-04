import { Body, Controller, UsePipes, ValidationPipe, Post } from '@nestjs/common'
import { CreateDto } from './dto'
import { StaffService } from './staff.service'
import { ESwaggerMessages } from '@/core/swagger'
import { RolesAuthGuard } from '@/auth/guards/role.guard'
import { EStaffRole } from '@/core/enums'
import {
	ApiOkResponse,
	ApiOperation,
	ApiTags,
	ApiUnauthorizedResponse,
	ApiForbiddenResponse,
	ApiBadRequestResponse,
	ApiBearerAuth
} from '@nestjs/swagger'

import { EStaffSwaggerMessages, CreateStaffOk } from './swagger'

@ApiTags('Управляющие')
@ApiBearerAuth('access-token')
@UsePipes(new ValidationPipe({ whitelist: true }))
@Controller('staff')
export class StaffController {
	constructor(private readonly staffService: StaffService) {}

	@ApiOperation({
		summary: 'Создание нового профиля для управляющего',
		description: 'Только с ролью director'
	})
	@ApiOkResponse({ description: 'Профиль успешно создан', type: CreateStaffOk })
	@ApiUnauthorizedResponse({ description: ESwaggerMessages.UNAUTHORIZED })
	@ApiForbiddenResponse({ description: ESwaggerMessages.FORBIDDEN })
	@ApiBadRequestResponse({ description: EStaffSwaggerMessages.CREATE })
	@RolesAuthGuard(EStaffRole.DIRECTOR)
	@Post()
	create(@Body() dto: CreateDto) {
		return this.staffService.create(dto)
	}
}
