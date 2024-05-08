import { PickType } from '@nestjs/swagger'
import { CommonDtoSwagger } from '@/core/swagger'
import { CreateStaffDto } from './create.dto'

export class UpdatePasswordStaffDto extends PickType(CreateStaffDto, ['password']) {
	@CommonDtoSwagger.password()
	public readonly newPassword: string
}
