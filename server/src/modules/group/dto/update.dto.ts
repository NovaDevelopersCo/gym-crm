import { PartialType } from '@nestjs/swagger'
import { CreateGroupDto } from './create.dto'

export class UpdateGroupDto extends PartialType(CreateGroupDto) {}
