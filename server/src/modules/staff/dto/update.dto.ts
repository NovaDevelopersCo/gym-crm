import { OmitType } from '@nestjs/swagger'
import { CreateStaffDto } from './create.dto'

export class UpdateStaffDto extends OmitType(CreateStaffDto, ['password', 'role']) {}
