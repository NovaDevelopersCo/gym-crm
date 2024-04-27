import { IStaff } from '@/store'

interface LoginStaffDto extends Pick<IStaff, 'email'> {
	password: string
}

export default LoginStaffDto
