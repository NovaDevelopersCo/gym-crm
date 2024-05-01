import { IStaff } from './'

interface CreateStaffDto extends Pick<IStaff, 'role' | 'email'> {
	password: string
}

export default CreateStaffDto
