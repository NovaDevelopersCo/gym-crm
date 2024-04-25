import { PickType } from '@nestjs/swagger'
import { CommonDecoratorsSwagger } from '@/core/swagger'
import { CreateStaffDto } from './create.dto'

export class UpdatePasswordStaffDto extends PickType(CreateStaffDto, ['password']) {
	@CommonDecoratorsSwagger.password(true)
	newPassword: string
}
