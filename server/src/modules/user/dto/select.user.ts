import { FindOptionsSelect } from 'typeorm'
import { UserEntity } from '../entities'

export const returnSelectUser: FindOptionsSelect<UserEntity> = {
	id: true,
	email: true,
	fio: true
}
