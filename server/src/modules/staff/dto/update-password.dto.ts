import { PickType } from '@nestjs/swagger'
import { CommonPropertiesSwagger } from '@/core/swagger'
import { CreateStaffDto } from './create.dto'

export class UpdatePasswordStaffDto extends PickType(CreateStaffDto, ['password']) {
	@CommonPropertiesSwagger.password()
	public readonly newPassword: string
}
