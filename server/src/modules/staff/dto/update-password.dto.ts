import { PickType } from '@nestjs/swagger'
import { PropertyDecoratorsSwagger } from '@/core/swagger'
import { CreateStaffDto } from './create.dto'

export class UpdatePasswordStaffDto extends PickType(CreateStaffDto, ['password']) {
	@PropertyDecoratorsSwagger.password(true)
	newPassword: string
}
