import { IStaff } from '../..'

interface CreateStaffDto extends Omit<IStaff, 'id'> {
	password: string
}

export default CreateStaffDto
