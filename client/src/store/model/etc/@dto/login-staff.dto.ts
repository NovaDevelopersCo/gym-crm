import { IStuff } from '@/store'

interface LoginStuffrDto extends Pick<IStuff, 'email'> {
	password: string
}

export default LoginStuffrDto
