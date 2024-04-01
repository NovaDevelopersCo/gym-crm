import { IStuff } from '../..'

interface CreateStaffDto extends Omit<IStuff, 'id'> {
	password: string
}

export default CreateStaffDto
