import { OmitType } from '@nestjs/swagger'
import { AbonementEntity, UserAbonementEntity } from '../entities'

export class AbonementDto extends OmitType(AbonementEntity, ['userAbonements', 'clubs']) {}
export class UserAbonementDto extends OmitType(UserAbonementEntity, ['abonement', 'user']) {}
