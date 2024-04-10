import { applyDecorators } from '@nestjs/common'

import {
	ApiOperation,
	ApiOkResponse,
	ApiUnauthorizedResponse,
	ApiForbiddenResponse,
	ApiBadRequestResponse
} from '@nestjs/swagger'

import { CreateStaffOk } from './responses'
import { EStaffSwaggerMessages } from './messages.enum'
import { ESwaggerMessages } from '@/core/swagger'

export class StaffDocSwagger {
	static create() {
		return applyDecorators(
			ApiOperation({
				summary: 'Создание нового профиля персонала',
				description: 'Только с ролью director'
			}),
			ApiOkResponse({ description: 'Профиль успешно создан', type: CreateStaffOk }),
			ApiUnauthorizedResponse({ description: ESwaggerMessages.UNAUTHORIZED }),
			ApiForbiddenResponse({ description: ESwaggerMessages.FORBIDDEN }),
			ApiBadRequestResponse({ description: EStaffSwaggerMessages.CREATE })
		)
	}
}
