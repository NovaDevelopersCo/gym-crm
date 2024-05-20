import { OmitType } from '@nestjs/swagger'
import { DirectionEntity } from '../entities'

export class DirectionDto extends OmitType(DirectionEntity, ['groups']) {}
