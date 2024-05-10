import { IsEnum } from 'class-validator'
import { ECreateStaffRole, EStaffRole } from '@/core/enums'
import { Property } from '@/core/utils'
import { ClubEntity } from '@/modules/club/entities'

export class StaffPropertiesSwagger {
	public static roleCreate() {
		return new Property({
			example: 'admin',
			decorators: [IsEnum(ECreateStaffRole, { message: 'Невалидная роль' })],
			enum: ECreateStaffRole,
			description: 'Роль пользователя',
			validation: true
		}).exec()
	}

	public static club() {
		return new Property({
			description: 'Клуб',
			type: () => ClubEntity
		}).exec()
	}
	public static role() {
		return new Property({
			example: 'admin',
			description: 'Роль персонала',
			enum: EStaffRole
		}).exec()
	}
}
