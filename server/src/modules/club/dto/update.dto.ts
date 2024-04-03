import { PartialType } from '@nestjs/swagger'
import { CreateClubDto } from './create.dto'

export class UpdateClubDto extends PartialType(CreateClubDto) {}
