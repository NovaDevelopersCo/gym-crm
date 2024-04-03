import { ApiProperty, PartialType } from '@nestjs/swagger'
import { ECreateStaffRole } from '../enums'
import { DirectionEntity } from '@/modules/direction/entities'

export class AuthOk {
	@ApiProperty({
		default:
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
	})
	accessToken: string
}

class Profile {
	@ApiProperty()
	fio: string

	@ApiProperty({
		enum: ECreateStaffRole
	})
	role: ECreateStaffRole

	@ApiProperty()
	email: string

	@ApiProperty()
	id: string
}

export class RefreshOk extends AuthOk {
	@ApiProperty({
		default: {
			fio: 'Васильев Василий Васильевич',
			role: 'admin / trainer',
			email: 'email@email.com',
			id: '35'
		}
	})
	profile: Profile
}

export class CreateStaffOk {
	@ApiProperty({ enum: ECreateStaffRole, default: 'admin / trainer' })
	role: ECreateStaffRole

	@ApiProperty({
		default: 'email@email.com'
	})
	email: string

	@ApiProperty({
		default: '35'
	})
	id: string
}

export class DeleteDirectionOk {
	@ApiProperty({ default: true })
	message: boolean
}

export class UpdateDirectionOk {
	@ApiProperty({ default: 'Кикбоксинг' })
	name: string
	@ApiProperty({ default: 111 })
	id: number
}

export class CreateDirectionOk extends PartialType(UpdateDirectionOk) {}
export class GetDirectionById extends PartialType(UpdateDirectionOk) {}
export class GetAllDirections {
	@ApiProperty({
		default: [
			{ id: 1, name: 'Кикбоксинг' },
			{ id: 2, name: 'Бокс' }
		]
	})
	directions: DirectionEntity[]
}
