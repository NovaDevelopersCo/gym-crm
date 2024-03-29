import { IUser } from '../..'

type TLoginResponse = {
	profile: IUser | null
	accessToken: string | null
}

export default TLoginResponse
