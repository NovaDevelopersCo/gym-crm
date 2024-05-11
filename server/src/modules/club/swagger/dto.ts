import { OmitType } from '@nestjs/swagger'
import { ClubEntity } from '../entities'

export class ClubDto extends OmitType(ClubEntity, [
	'admins',
	'abonements',
	'groups',
	'users',
	'products'
]) {}
