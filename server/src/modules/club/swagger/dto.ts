import { PickType } from '@nestjs/swagger'
import { ClubEntity } from '../entities'

export class ClubDto extends PickType(ClubEntity, ['id', 'address', 'name']) {}
