import { IStuff } from '@store/model'

interface LoginStuffrDto extends Pick<IStuff, 'email'> {
	password: string
}

export default LoginStuffrDto
