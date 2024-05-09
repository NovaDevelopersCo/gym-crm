import { ApiProperty, PickType } from '@nestjs/swagger'
import { StaffEntity } from '../entities'
import { ECreateStaffRole } from '@/core/enums'

export class StaffDto extends PickType(StaffEntity, ['id', 'email', 'role']) {}

export class StaffAdminDto extends PickType(StaffEntity, ['id', 'email']) {
	@ApiProperty({
		enum: ECreateStaffRole,
		description: 'Роль пользователя'
	})
	public readonly role: ECreateStaffRole
}
