import { PickType } from '@nestjs/swagger'
import { StaffDecoratorsSwagger } from '../swagger/decorators'
import { CreateStaffDto } from './create.dto'

export class UpdatePasswordStaffDto extends PickType(CreateStaffDto, ['password']) {
	@StaffDecoratorsSwagger.password(true)
	newPassword: string
}
