import { IStaff } from './'

interface LoginStaffDto extends Pick<IStaff, 'email'> {
	password: string
}

export default LoginStaffDto
