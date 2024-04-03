import { PartialType } from '@nestjs/swagger'
import { CreateDirectionDto } from './create.dto'

export class UpdateDirectionDto extends PartialType(CreateDirectionDto) {}
