import { IUser } from '../..'

type TRegistrationResponse = {
	profile: IUser | null
	accessToken: string | null
}

export default TRegistrationResponse
