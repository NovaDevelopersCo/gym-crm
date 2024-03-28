import { IUser } from '../..'

type TLoginResponse = {
	user: IUser | null
	accessToken: string | null
}

export default TLoginResponse
