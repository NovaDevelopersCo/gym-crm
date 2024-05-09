import { OmitType } from '@nestjs/swagger'
import { UserEntity } from '../entities'

export class UserDto extends OmitType(UserEntity, ['abonements', 'groups', 'orders', 'club']) {}
