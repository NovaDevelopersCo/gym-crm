import { applyDecorators } from '@nestjs/common'
import { ApiOperation, ApiOkResponse } from '@nestjs/swagger'
import { CreateStaffOk } from './responses'
import { BaseDocSwagger } from '@/core/swagger/docs'

export class StaffDocSwagger {
	static create() {
		return applyDecorators(
			ApiOperation({
				summary: 'Создание нового профиля для управляющего',
				description: 'Только с ролью director'
			}),
			ApiOkResponse({ description: 'Профиль успешно создан', type: CreateStaffOk }),
			BaseDocSwagger.authWithRole()
		)
	}
}
