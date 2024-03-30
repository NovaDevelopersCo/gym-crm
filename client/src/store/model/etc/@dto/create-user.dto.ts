import { IUser } from '../..'

interface CreateUserDto extends Omit<IUser, 'id'> {
	password: string
}

export default CreateUserDto
