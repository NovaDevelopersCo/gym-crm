import { ApiProperty, OmitType } from '@nestjs/swagger'
import { StaffEntity } from '../entities'
import { ECreateStaffRole } from '@/core/enums'

export class StaffDto extends OmitType(StaffEntity, ['club', 'password']) {}

export class StaffAdminDto extends OmitType(StaffEntity, ['club', 'password', 'role']) {
	@ApiProperty({
		enum: ECreateStaffRole,
		description: 'Роль пользователя'
	})
	public readonly role: ECreateStaffRole
}
